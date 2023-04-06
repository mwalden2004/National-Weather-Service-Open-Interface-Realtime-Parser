//@ts-expect-error aint no one care
import { client, xml } from '@xmpp/client';
import events from "events";
import MessageParser from './parsers/MessageParser';
import { Attributes } from './WarningDefinitions';
const nws_event = new events.EventEmitter()

export type ConstructorType = {
    testing?: boolean;
    username?: string;
    password?: string;
    service_name?: string;
}

export default class NWWSOI {
    data: ConstructorType;
    testing: boolean;
    xmpp: any;
    emitter = nws_event;

    constructor(data: ConstructorType) {
        this.data = data;
        this.testing = data.testing || false;
        if (!data.username || !data.password || !data.service_name) {
            throw new Error("Must provide username, password, and service_name if you are not testing.")
        }

        const xmpp = client({ service: 'xmpp://nwws-oi.weather.gov', domain: 'nwws-oi.weather.gov', username: data.username, password: data.password }).setMaxListeners(0);
        this.xmpp = xmpp;

        xmpp.on('error', (err: any) => { console.error('Something went wrong: ', err.toString()) })

        xmpp.on('online', (address: string) => {
            xmpp.send(xml('presence', { to: 'nwws@conference.nwws-oi.weather.gov/' + data.service_name }, { xmlns: 'http://jabber.org/protocol/muc' }))
        })

        xmpp.on('stanza', (stanza: any) => {
            if (stanza.is('message')) {
                const x = stanza.getChild('x');//Get the X stanza, which includes all relevant data.
                if (!x || !x.children) {
                    return;
                }
                const msg = x.children[0];
                const attrs: Attributes = x.attrs as Attributes;
                nws_event.emit('unparsed_message_event', { msg: msg, attrs: attrs });
                const awipsid = attrs?.awipsid;
                if (msg && attrs && awipsid) {//If there issuing data, and a valid message then go ahead an parse the warning.
                    try {
                        nws_event.emit('event', new MessageParser(msg, attrs));
                    } catch (err) {
                        throw new Error("Something went wrong parsing: " + err)
                    }
                }

            }
        })

        xmpp.start().catch(new Error)


    }

    returnListener() {
        return nws_event;
    }

    sendTestMessage(attrs: any, msg: string) {
        if (!this.testing) {
            throw Error("Can not send a test message while not testing.")
        }
            nws_event.emit('unparsed_message_event', { msg: msg, attrs: attrs });
            const newmsg = new MessageParser(msg, attrs)
            nws_event.emit('event', newmsg);
    }


}