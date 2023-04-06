# SASL : SCRAM-SHA-1

[![Build Status](https://travis-ci.org/otalk/xmpp-uri.png)](https://travis-ci.org/otalk/xmpp-uri)
[![Dependency Status](https://david-dm.org/otalk/xmpp-uri.png)](https://david-dm.org/otalk/xmpp-uri)
[![devDependency Status](https://david-dm.org/otalk/xmpp-uri/dev-status.png)](https://david-dm.org/otalk/xmpp-uri#info=devDependencies)

[![Browser Support](https://ci.testling.com/otalk/xmpp-uri.png)](https://ci.testling.com/otalk/xmpp-uri)


This module is a JavaScript implementation of the SCRAM-SHA-1 SASL mechanism,
which plugs into the [SASL](https://github.com/jaredhanson/js-sasl) framework.

## Installing

```sh
$ npm install sasl-scram-sha-1
```

## Usage

Register the SCRAM-SHA-1 mechanism.

```javascript
factory.use(require('sasl-scram-sha-1'));
```

Send an authentication response with necessary credentials.

```
var mech = factory.create(['SCRAM-SHA-1']);
var initial = mech.response({username: 'chris', password: 'secret'});

var secondResp = mech.challenge('r="XCV234BAL90",s="XMXC234DFS",i=4096')
                     .response({username: 'chris', password: 'secret'});
```

## TODO

Currently missing features:

- Mutual authentication of the server based on the success message.
  

## Credits

  - [Lance Stout](http://github.com/legastero)
  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2013 Lance Stout <[http://github.com/legasteros/](http://github.com/legastero/)>
Copyright (c) 2012 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
