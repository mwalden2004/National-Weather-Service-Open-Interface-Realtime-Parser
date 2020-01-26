const { client, xml } = require('@xmpp/client');
const MessageParser = require("./classes/message-parser");
const events=require("events");
const nws_event = new events.EventEmitter()

class NWWSOI{
    constructor(data){
        this.data = data;
        if (data.testing){

            this.testing = true;

        }else{
            if (data.username !== null && data.password !== null && data.service_name !== null){
                xmpp = client({ service: 'xmpp://nwws-oi.weather.gov', domain: 'nwws-oi.weather.gov', username: data.username, password: data.password }).setMaxListeners(0);
                this.xmpp=xmpp;

                xmpp.on('error', err => { console.error('Something went wrong: ', err.toString()) })
    
                xmpp.on('online', address => {
                    xmpp.send(xml('presence', { to: 'nwws@conference.nwws-oi.weather.gov/' + data.service_name }, { xmlns: 'http://jabber.org/protocol/muc' }))
                })

                xmpp.on('stanza', async stanza => {
                    if (stanza.is('message')) {
                        const x = stanz.getChild('x');//Get the X stanza, which includes all relevant data.
                        if (x) {//Sometimes, it likes to be stupid,so we make sure X is real.
                            if (x.children) {//Get the data of the message
                                const msg = x.children[0];
                                const attrs = x.attrs;
                                nws_event.emit('unparsed_message_event', { msg: msg, attrs: attrs });
                                if (msg && attrs) {//If there issuing data, and a valid message then go ahead an parse the warning.
                                    const awipsid = attrs.awipsid;
                                    if (awipsid) {//AWIPS id means it is a valid issued message, but we still need to parse, and do more saftey-checks.
                                        try {
                                            const msg = new MessageParser(msg, attrs)
                                            nws_event.emit('event', msg);
                                        } catch (err) {
                                            throw new Error("NWWS-OI Parser | Something went wrong parsing: " + err)
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
    
                xmpp.start().catch(new Error)
            }else{
                throw new Error("Must provide username, password, and service_name if you are not testing.")
            }
        }

        return nws_event;
    }

    sendTestMessage(attrs, msg){
        if (this.testing){
            nws_event.emit('unparsed_message_event', { msg: msg, attrs: attrs });
            const newmsg = new MessageParser(msg, attrs)
            nws_event.emit('event', newmsg);
        }else{
            throw Error("Can not send a test message while not testing.")
        }
    }


}

module.exports=NWWSOI;