# National Weather Service Open-Interface Realtime Parser
*long name*

This package is used to pull real-time information from NWWS-OI, using Node.JS. This package also handles parsing.

## Prequiries

You're going to have to have an NWWS-OI account, but don't worry: it's pretty easy to get, the worst part is waiting. To get started on creating an account you need to go to [here](https://www.weather.gov/NWWS/nwws_oi_request), fill out the form and wait.

This is the only method I really know to get realtime information, but I am also working on another addon to this project to get radar data, and mapping information. Thus giving more data, in less time.

## Installation


```bash
npm install nwws-oi
```

## Usage

```nodejs
const config = {
    username: "username",//Enter your username for NWWS-OI, sent to you by email
    password: "password",//Enter your password for NWWS-OI, sent to you by email
    service_name: "something",//Please enter a identifier for your client, if you don't do this, you're not getting in :(
    testing: false//only use if you are giving false products to the system. if you are add your awips data to line: 28. THIS WILL DISABLE ALL CONNECTION TO THE XMPP SERVER!
};
const nwws = require("nwws-oi")(config)

if (config.testing) {

    nwws.events.on("unparsed_message_event", function (data) {
        console.log("receive", data)
    })

    nwws.events.on("event", function (data) {
        console.log("event", data)
    })

    nwws.parse({
        attrs: {
            "xmlns": "nwws-oi",
            "cccc": "KJAN",
            "ttaaii": "WUUS54",
            "issue": "2019-10-26T14:38:00Z",
            "awipsid": "SVRJAN",
            "id": "13743.3632"
        },
        data: `AWIPS Warning/Watch`})//if you live under a rock, and don't save every warning your receive feel free to use the great text products over at Wikipedia: https://en.wikipedia.org/wiki/Specific_Area_Message_Encoding

} else {//Not testing, I'd reccommend starting down here :)
    nwws.on("unparsed_message_event", function (data) {
        console.log("receive", data)
    })

    nwws.on("event", function (data) {
        console.log("event", data)
    })
}
```

I would highly recommend checking out my code on [our GitHub location here](https://github.com/mwalden2004/National-Weather-Service-Open-Interface-Realtime-Parser), and helping make it better! If you have an issue, feel free to open an issue there.

## Most Recent Update Info:  VERSION: 1.0.3

Allow for an array to be passed with configuration data, instead of passing by 3 args.
Added a testing mode
Fixed parsing for Flodd Warnings; they did not have TIME...MOT...LOC which threw everything off, if you have a iussue with parsing locations please report in a issue so I can fix this.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
To collaborate go to [our GitHub location here](https://github.com/mwalden2004/National-Weather-Service-Open-Interface-Realtime-Parser)

## License
Honestly, I don't care what you do with it, just please: be a good person. Give credit where credit is due, and don't say you wrote this code unless you have collaborated. :-)