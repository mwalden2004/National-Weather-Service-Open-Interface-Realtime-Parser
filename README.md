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
const nwws = require("nwws-oi")("Put username you received by Email HERE.",
    "Put the password you received by Email HERE"
    , "Enter a name or domain regarding your usage of this service. DO NOT LEAVE THIS BLANK, IT CAN BE ANYTHING, JUST NOT BLANK.");

nwws.on("unparsed_message_event", function (data) {
    //If you perfer to write your own parser, here you can do that. Data is: {msg: msg, attrs: attrs}
})

nwws.on("event", function (data) {
    /*
    Parsed message handler:
    Looks like this
    {
        "phenomena": "Severe Thunderstorm",
        "significance": "Warning",
        "action": "New event",
        "start": "2019-10-26T19:38:00.000Z",
        "end": "2019-10-26T20:30:00.000Z",
        "polygon": [
            [
                -89.18,
                "33.03"
            ],
            [
                -89.4,
                "33.17"
            ],
            [
                -89.72,
                "33.21"
            ],
            [
                -89.69,
                "33.29"
            ],
            [
                -89.65,
                "33.29"
            ],
            [
                -89.65,
                "33.37"
            ],
            [
                -89.49,
                "33.72"
            ],
            [
                -89.19,
                "33.72"
            ],
            [
                -89.19,
                "33.74"
            ],
            [
                -89.04,
                "33.74"
            ],
            [
                -89.03,
                "33.75"
            ],
            [
                -88.93,
                "33.76"
            ],
            [
                -88.93,
                "33.81"
            ],
            [
                -88.78,
                "33.81"
            ],
            [
                -89.18,
                "33.03"
            ]
        ],
        "back_data": {
            "office_id": "KJAN",
            "productclass": "O",
            "event_tracking": "0353",
            "phenomena": "SV",
            "significance": "W",
            "action": "NEW",
            "raw_attrs": {
                "xmlns": "nwws-oi",
                "cccc": "KJAN",
                "ttaaii": "WUUS54",
                "issue": "2019-10-26T14:38:00Z",
                "awipsid": "SVRJAN",
                "id": "13743.3632"
            },
            "raw_msg": "\n\n164\n\nWUUS54 KJAN 261438\n\nSVRJAN\n\nMSC007-019-025-097-105-155-159-261530-\n\n/O.NEW.KJAN.SV.W.0353.191026T1438Z-191026T1530Z/\n\n\n\nBULLETIN - IMMEDIATE BROADCAST REQUESTED\n\nSevere Thunderstorm Warning\n\nNational Weather Service Jackson MS\n\n938 AM CDT Sat Oct 26 2019\n\n\n\nThe National Weather Service in Jackson has issued a\n\n\n\n* Severe Thunderstorm Warning for...\n\n  Choctaw County in central Mississippi...\n\n  Western Oktibbeha County in northeastern Mississippi...\n\n  Northeastern Attala County in central Mississippi...\n\n  Northwestern Winston County in east central Mississippi...\n\n  Webster County in north central Mississippi...\n\n  Eastern Montgomery County in north central Mississippi...\n\n  Western Clay County in northeastern Mississippi...\n\n\n\n* Until 1030 AM CDT.\n\n\n\n* At 938 AM CDT, a severe thunderstorm was located near Chester, or\n\n  23 miles northwest of Louisville, moving north at 60 mph.\n\n\n\n  HAZARD...60 mph wind gusts.\n\n\n\n  SOURCE...Radar indicated.\n\n\n\n  IMPACT...Expect damage to roofs, siding, and trees.\n\n\n\n* This severe thunderstorm will be near...\n\n  Sherwood around 945 AM CDT.\n\n  Eupora and Mathiston around 950 AM CDT.\n\n  Maben, Clarkson, Cumberland and Bellefontaine around 955 AM CDT.\n\n\n\nOther locations impacted by this severe thunderstorm include Mccool,\n\nWalthall, French Camp, Mantee, Sturgis and Weir.\n\n\n\nPRECAUTIONARY/PREPAREDNESS ACTIONS...\n\n\n\nFor your protection move to an interior room on the lowest floor of a\n\nbuilding.\n\n\n\n&&\n\n\n\nLAT...LON 3303 8918 3317 8940 3321 8972 3329 8969\n\n      3329 8965 3337 8965 3372 8949 3372 8919\n\n      3374 8919 3374 8904 3375 8903 3376 8893\n\n      3381 8893 3381 8878\n\nTIME...MOT...LOC 1438Z 200DEG 51KT 3340 8928 \n\n\n\nHAIL...<.75IN\n\nWIND...60MPH\n\n \n\n$$\n\n\n\nJM\n\n"
        }
    }
    */
})
```

I would highly recommend checking out my code on [our GitHub location here](https://github.com/mwalden2004/National-Weather-Service-Open-Interface-Realtime-Parser), and helping make it better! If you have an issue, feel free to open an issue there.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
To collaborate go to [our GitHub location here](https://github.com/mwalden2004/National-Weather-Service-Open-Interface-Realtime-Parser)

## License
Honestly, I don't care what you do with it, just please: be a good person. Give credit where credit is due, and don't say you wrote this code unless you have collaborated. :-)
