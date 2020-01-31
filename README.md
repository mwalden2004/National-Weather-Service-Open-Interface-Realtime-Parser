# National Weather Service Open-Interface Realtime Parser
*long name*

# THIS WAS RECENTLY ENTIERLY REWROTE TO BE CLEANER, PLEASE MAKE SURE YOU UPDATE YOUR CODE TO MATCH THE **BREAKING, AND MAJOR** CHANGES! [THIS IS NOT FINISHED, I AM STILL REWRITING]

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
    username: "username here",//Enter your username for NWWS-OI, sent to you by email
    password: "password here",//Enter your password for NWWS-OI, sent to you by email
    service_name: "some name",//Please enter a identifier for your client, if you don't do this, you're not getting in :(
    testing: true//only use if you are giving false products to the system. if you are add your awips data to line: 28. THIS WILL DISABLE ALL CONNECTION TO THE XMPP SERVER!
};

const NWSModule = require("./nwws-oi-rewrite/index.js");
const nwws = new NWSModule(config)

const eventListener = nwws.returnListener();


eventListener.on("unparsed_message_event", function (data) {
    //console.log("receive", data)
})

eventListener.on("event", function (data) {
    //console.log("event", data)

    require("fs").writeFileSync("./warning.json", JSON.stringify(data.returnInfo()))
})

if (config.testing) {
    nwws.sendTestMessage({
        "xmlns": "nwws-oi",
        "cccc": "KBMX",
        "ttaaii": "WFUS54",
        "issue": "2019-10-26T14:38:00Z",
        "awipsid": "SVRBMX",
        "id": "13743.3632"
    }, require("fs").readFileSync("./warningdata.txt"))
}

```

I would highly recommend checking out my code on [our GitHub location here](https://github.com/mwalden2004/National-Weather-Service-Open-Interface-Realtime-Parser), and helping make it better! If you have an issue, feel free to open an issue there.

## Most Recent Update Info:  VERSION: 2.0.0

Added new information in returned events
```json
{
    "header": {
        "class": "Operational product",
        "action": "New event",
        "office": "KBMX",
        "phenomena": "Tornado",
        "significance": "Warning",
        "event_tracking_number": "0003",
        "start": "2019-01-19T21:43:00.000Z",
        "end": "2019-01-19T22:30:00.000Z",
        "raw_data": {
            "class": "O",
            "action": "NEW",
            "office": "KBMX",
            "phenomena": "TO",
            "significance": "W",
            "event_tracking_number": "0003",
            "phenomstartena": "190119T1543Z",
            "end": "190119T1630Z"
        }
    },
    "extra_info": {
        "Hazard": "Tornado. ",
        "Source": "Radar indicated rotation. ",
        "Impact": "Flying debris will be dangerous to those caught withoutshelter. Mobile homes will be damaged or destroyed.Damage to roofs, windows, and vehicles will occur.Treedamage is likely",
        "LocationsInclude": " Eutaw, Boligee, Union, Gainesville, Knoxville, Allison, Snoddy, New Mount Hebron, I 20 Rest Area Near Eutaw and Clinton.",
        "Actions": "TAKE COVER NOW! Move to a basement or an interior room on the lowest floor of a sturdy building. Avoid windows. If you are outdoors, in a mobile home, or in a vehicle, move to the closest substantial shelter and protect yourself from flying debr",
        "Hail": "<.75MPH",
        "Tornado": "RADAR INDICATED"
    },
    "polygon": [
        {
            "lat": "32.80",
            "long": "88.25"
        },
        {
            "lat": "33.08",
            "long": "87.83"
        },
        {
            "lat": "33.02",
            "long": "87.83"
        },
        {
            "lat": "33.02",
            "long": "87.71"
        },
        {
            "lat": "32.99",
            "long": "87.71"
        },
        {
            "lat": "32.98",
            "long": "87.75"
        },
        {
            "lat": "32.96",
            "long": "87.74"
        },
        {
            "lat": "32.95",
            "long": "87.75"
        },
        {
            "lat": "32.95",
            "long": "87.73"
        },
        {
            "lat": "32.93",
            "long": "87.77"
        },
        {
            "lat": "32.91",
            "long": "87.76"
        },
        {
            "lat": "32.90",
            "long": "87.77"
        },
        {
            "lat": "32.90",
            "long": "87.81"
        },
        {
            "lat": "32.88",
            "long": "87.81"
        },
        {
            "lat": "32.86",
            "long": "87.83"
        },
        {
            "lat": "32.85",
            "long": "87.83"
        },
        {
            "lat": "32.71",
            "long": "88.11"
        }
    ]
}
```
Added extra_info types and totaly rewrote most of the parser to make it more efficent/readable.
Fixed some parsing issues too. Testing using https://mesonet.agron.iastate.edu/vtec/#2019-O-NEW-KBMX-SV-W-0001/USCOMP-N0Q-201901192235

Layed infunstrucutre to split parsing into seperate files. *as much as i'd love to have a 20k line file*

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
To collaborate go to [our GitHub location here](https://github.com/mwalden2004/National-Weather-Service-Open-Interface-Realtime-Parser)

## License
Honestly, I don't care what you do with it, just please: be a good person. Give credit where credit is due, and don't say you wrote this code unless you have collaborated. :-)
