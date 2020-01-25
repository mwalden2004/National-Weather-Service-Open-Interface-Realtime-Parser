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
        data: `AWIPS Warning/Watch`})//if you live under a rock, and don't save every warning your receive feel free to use the great text products over at mesonet: https://mesonet.agron.iastate.edu/vtec/#2019-O-NEW-KBMX-SV-W-0001/USCOMP-N0Q-20190119223

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

## Most Recent Update Info:  VERSION: 1.1.0

Added new information in returned events
```json
{
    "phenomena": "Tornado",
    "significance": "Warning",
    "action": "New event",
    "start": "2020-01-11T23:00:00.000Z",
    "end": "2020-01-11T23:45:00.000Z",
    "polygon": [
        {
            "lat": "32.96",
            "long": "88.35"
        },
        {
            "lat": "32.99",
            "long": "88.33"
        },
        {
            "lat": "33.00",
            "long": "88.13"
        },
        {
            "lat": "32.89",
            "long": "87.97"
        },
        {
            "lat": "32.66",
            "long": "88.38"
        }
    ],
    "PDS": false,
    "Counties": "West central Greene County in west central Alabama, Northwestern Sumter County in west central Alabama, ",
    "extras": {
        "Hazard": "Tornado. ",
        "Source": "Radar indicated rotation. ",
        "Impact": "Flying debris will be dangerous to those caught withoutshelter. Mobile homes will be damaged or destroyed.Damage to roofs, windows, and vehicles will occur.Treedamage is likely",
        "LocationsInclude": " Gainesville, Emelle, New West Greene, Panola, West Greene, Geiger, Warsaw and New Mount Hebron.",
        "Actions": "TAKE COVER NOW! Move to a basement or an interior room on the lowest floor of a sturdy building. Avoid windows. If you are outdoors, in a mobile home, or in a vehicle, move to the closest substantial shelter and protect yourself from flying debr",
        "Hail": "<.75MPH",
        "Tornado": "RADAR INDICATED"
    },
    "back_data": {
        "office_id": "KBMX",
        "product_class": "O",
        "event_tracking": "0001",
        "raw_attrs": {
            "xmlns": "nwws-oi",
            "cccc": "KBMX",
            "ttaaii": "WFUS54",
            "issue": "2019-10-26T14:38:00Z",
            "awipsid": "SVRBMX",
            "id": "13743.3632"
        },
        "raw_msg": "\u0001\r\n408\r\nWFUS54 KBMX 111700\r\nTORBMX\r\nALC063-119-111745-\r\n/O.NEW.KBMX.TO.W.0001.200111T1700Z-200111T1745Z/\r\n\r\nBULLETIN - EAS ACTIVATION REQUESTED\r\nTornado Warning\r\nNational Weather Service Birmingham AL\r\n1100 AM CST Sat Jan 11 2020\r\n\r\nThe National Weather Service in Birmingham has issued a\r\n\r\n* Tornado Warning for...\r\n  West central Greene County in west central Alabama...\r\n  Northwestern Sumter County in west central Alabama...\r\n\r\n* Until 1145 AM CST.\r\n\r\n* At 1100 AM CST, a severe thunderstorm capable of producing a\r\n  tornado was located near Emelle, or 15 miles northwest of\r\n  Livingston, moving northeast at 60 mph.\r\n\r\n  HAZARD...Tornado.\r\n\r\n  SOURCE...Radar indicated rotation.\r\n\r\n  IMPACT...Flying debris will be dangerous to those caught without\r\n           shelter. Mobile homes will be damaged or destroyed.\r\n           Damage to roofs, windows, and vehicles will occur.  Tree\r\n           damage is likely.\r\n\r\n* Locations impacted include...\r\n  Gainesville, Emelle, New West Greene, Panola, West Greene, Geiger,\r\n  Warsaw and New Mount Hebron.\r\n\r\nPRECAUTIONARY/PREPAREDNESS ACTIONS...\r\n\r\nTAKE COVER NOW! Move to a basement or an interior room on the lowest\r\nfloor of a sturdy building. Avoid windows. If you are outdoors, in a\r\nmobile home, or in a vehicle, move to the closest substantial shelter\r\nand protect yourself from flying debris.\r\n\r\n&&\r\n\r\nLAT...LON 3296 8835 3299 8833 3300 8813 3289 8797\r\n      3266 8838\r\nTIME...MOT...LOC 1700Z 228DEG 54KT 3276 8838\r\n\r\nTORNADO...RADAR INDICATED\r\nHAIL...<.75IN\r\n\r\n$$\r\n\r\n40/Sizemore"
    }
}
```
Added nire extra_info types and totaly rewrote most of the parser to make it more efficent/readable.
Fixed some parsing issues too. Testing using https://mesonet.agron.iastate.edu/vtec/#2019-O-NEW-KBMX-SV-W-0001/USCOMP-N0Q-201901192235

Layed infunstrucutre to split parsing into seperate files. *as much as i'd love to have a 20k line file*

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
To collaborate go to [our GitHub location here](https://github.com/mwalden2004/National-Weather-Service-Open-Interface-Realtime-Parser)

## License
Honestly, I don't care what you do with it, just please: be a good person. Give credit where credit is due, and don't say you wrote this code unless you have collaborated. :-)