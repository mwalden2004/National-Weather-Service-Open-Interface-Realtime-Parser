const { client, xml } = require('@xmpp/client');
const events = require('events'); const NWS = new events.EventEmitter();
const MessageParser = require("./parse.js");

module.exports = function (data) {
    if (data.username && data.password && data.service_name) {

        if (data.testing) {


            function parse(stanz) {
                const msg = stanz.data;
                const attrs = stanz.attrs;
                NWS.emit('unparsed_message_event', { msg: msg, attrs: attrs });
                if (msg && attrs) {//If there issuing data, and a valid message then go ahead an parse the warning.
                    const awipsid = attrs.awipsid;
                    if (awipsid) {//AWIPS id means it is a valid issued message, but we still need to parse, and do more saftey-checks.
                        try {
                            MessageParser(msg, attrs, function(type, data){
                                NWS.emit('event', data);
                            });
                        } catch (err) {
                            console.error("NWWS-OI Parser | Something went wrong parsing: " + err)
                        }
                    }
                }
            }

            return {
                events: NWS,
                parse: parse
            };

        } else {


            const xmpp = client({ service: 'xmpp://nwws-oi.weather.gov', domain: 'nwws-oi.weather.gov', username: data.username, password: data.password }).setMaxListeners(0);

            xmpp.on('error', err => { console.error('Something went wrong: ', err.toString()) })

            function parse(stanz) {
                const x = stanz.getChild('x');//Get the X stanza, which includes all relevant data.
                if (x) {//Sometimes, it likes to be stupid,so we make sure X is real.
                    if (x.children) {//Get the data of the message
                        const msg = x.children[0];
                        const attrs = x.attrs;
                        NWS.emit('unparsed_message_event', { msg: msg, attrs: attrs });
                        if (msg && attrs) {//If there issuing data, and a valid message then go ahead an parse the warning.
                            const awipsid = attrs.awipsid;
                            if (awipsid) {//AWIPS id means it is a valid issued message, but we still need to parse, and do more saftey-checks.
                                try {
                                    MessageParser(msg, attrs, function(type, data){
                                        NWS.emit('event', data);
                                    });
                                } catch (err) {
                                    console.error("NWWS-OI Parser | Something went wrong parsing: " + err)
                                }
                            }
                        }
                    }
                }
            }


            xmpp.on('stanza', async stanza => {
                if (stanza.is('message')) {
                    parse(stanza)
                }
            })

            xmpp.on('online', address => {
                xmpp.send(xml('presence', { to: 'nwws@conference.nwws-oi.weather.gov/' + data.service_name }, { xmlns: 'http://jabber.org/protocol/muc' }))
            })

            xmpp.start().catch(console.error)
            return NWS;
        }

    } else {
        throw "Must enter required credentials."
    }
}
