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

## Most Recent Update Info:  VERSION: 1.0.6

Added new information in returned events
```json
{ phenomena: 'Severe Thunderstorm',
  significance: 'Warning',
  action: 'New event',
  start: 2019-01-20T04:39:00.000Z,
  end: 2019-01-20T05:15:00.000Z,
  polygon:
   [ [ -85.44, '32.39' ],
     [ -85.44, '32.49' ],
     [ -85.45, '32.50' ],
     [ -85.38, '32.73' ],
     [ -85.29, '32.73' ],
     [ -85.28, '32.75' ],
     [ -85.12, '32.74' ],
     [ -85.12, '32.69' ],
     [ -85.09, '32.66' ],
     [ -85.11, '32.65' ],
     [ -85.08, '32.63' ],
     [ -85.09, '32.62' ],
     [ -85.07, '32.58' ],
     [ -85.01, '32.52' ],
     [ -84.99, '32.49' ],
     [ -85, '32.46' ],
     [ -84.97, '32.44' ],
     [ -84.96, '32.42' ],
     [ -85.44, '32.39' ] ],
  PDS: false,
  Counties: [ 'Lee County', 'Northern Russell County' ],
  extras:
   { HAZARD: '60 mph wind gust',
     SOURCE: 'Radar indicated',
     IMPACT: 'Expect damage to roofs, siding, and trees',
     ACTIONS:
      'For your protection move to an interior room on the lowest floor of a building.' },
  back_data:
   { office_id: 'KBMX',
     productclass: 'O',
     event_tracking: '0001',
     raw_attrs:
      { xmlns: 'nwws-oi',
        cccc: 'KJAN',
        ttaaii: 'WUUS54',
        issue: '2019-10-26T14:38:00Z',
        awipsid: 'SVRJAN',
        id: '13743.3632' },
     raw_msg:
      '950\n        WUUS54 KBMX 192239\n        SVRBMX\n        ALC081-113-192315-\n        /O.NEW.KBMX.SV.W.0001.190119T2239Z-190119T2315Z/\n        \n        BULLETIN - IMMEDIATE BROADCAST REQUESTED\n        Severe Thunderstorm Warning\n        National Weather Service Birmingham AL\n        439 PM CST SAT JAN 19 2019\n        \n        The National Weather Service in Birmingham has issued a\n        \n        * Severe Thunderstorm Warning for...\n          Lee County in east central Alabama...\n          Northern Russell County in southeastern Alabama...\n        \n        * Until 515 PM CST.\n        \n        * At 439 PM CST, severe thunderstorms were located along a line\n          extending from near Beans Mill to Society Hill, moving northeast at\n          45 mph.\n        \n          HAZARD...60 mph wind gusts.\n        \n          SOURCE...Radar indicated.\n        \n          IMPACT...Expect damage to roofs, siding, and trees.\n        \n        * Locations impacted include...\n          Auburn, Phenix City, Opelika, Smiths, Smiths Station, Beulah, Beans\n          Mill, Ladonia, Beauregard, Bleecker, Griffen Mill, Bibb City,\n          Monterey Heights, Ladonia Sports Complex, Marvyn, Phenix Drag Strip\n          and Mount Jefferson.\n        \n        PRECAUTIONARY/PREPAREDNESS ACTIONS...\n        \n        For your protection move to an interior room on the lowest floor of a\n        building.\n        \n        &&\n        \n        A Tornado Watch remains in effect until 900 PM CST for southeastern\n        and east central Alabama.\n        \n        LAT...LON 3239 8544 3249 8544 3250 8545 3273 8538\n              3273 8529 3275 8528 3274 8512 3269 8512\n              3266 8509 3265 8511 3263 8508 3262 8509\n              3258 8507 3252 8501 3249 8499 3246 8500\n              3244 8497 3242 8496\n        TIME...MOT...LOC 2239Z 245DEG 40KT 3272 8530 3244 8543\n        \n        HAIL...<.75IN\n        WIND...60MPH\n        \n        $$\n        \n        89^GSatterwhite' } }
```
Specifically: Counties, Extras, PDS.

Layed infunstrucutre to split parsing into seperate files. *as much as i'd love to have a 20k line file*

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
To collaborate go to [our GitHub location here](https://github.com/mwalden2004/National-Weather-Service-Open-Interface-Realtime-Parser)

## License
Honestly, I don't care what you do with it, just please: be a good person. Give credit where credit is due, and don't say you wrote this code unless you have collaborated. :-)