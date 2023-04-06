> **Warning**
> This code is in the process of being rewrote, it may not work -- and will break.

# NWWS-OI Node.js Module

NWWS-OI is a Node.js module that provides an interface for receiving National Weather Service (NWS) warnings and products via XMPP (Jabber) protocol. It allows you to receive NWS warnings and products in real-time by connecting to the NWS XMPP server.

### Prerequisites

To use NWWS-OI, you need to have an account with the National Weather Service. If you don't have an account yet, you can register [here](https://www.weather.gov/NWWS/nwws_oi_request).

### Installation

To install NWWS-OI, run:

> npm install NWWS-OI
>

### Usage

```javascript
import NWWSOI from 'NWWS-OI';

const nwws = new NWWSOI({
  testing: false,
  username: 'myusername',
  password: 'mypassword',
  service_name: 'myservicename',
});

nwws.returnListener().on('event', (warning) => {
  console.log(warning);
});
```

In the above example, a new instance of the NWWSOI class is created with the testing flag set to false and valid credentials provided for the NWS XMPP server. The returnListener() method is used to get the event emitter, and an event listener is added to listen for 'event' events. When a new warning is received, the 'event' event is emitted, and the warning is logged to the console.