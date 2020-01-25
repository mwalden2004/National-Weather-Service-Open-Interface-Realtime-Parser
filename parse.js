const Phenomenas = { // lots of em huh
    AF: "Ashfall(land)",
    AS: "Air Stagnation",
    BH: "Beach Hazard",
    BW: "Brisk Wind",
    BZ: "Blizzard",
    CF: "Coastal Flood",
    DF: "Debris Flow",
    DS: "Dust Storm",
    EC: "Extreme Cold",
    EH: "Excessive Heat",
    EW: "Extreme Wind",
    FA: "Areal Flood",
    FF: "Flash Flood",
    FG: "Dense Fog(land)",
    FL: "Flood",
    FR: "Frost",
    FW: "Fire Weather",
    FZ: "Freeze",
    GL: "Gale",
    HF: "Hurricane Force Wind",
    HT: "Heat",
    HU: "Hurricane",
    HW: "High Wind",
    HY: "Hydrologic",
    HZ: "Hard Freeze",
    IS: "Ice Storm",
    LE: "Lake Effect Snow",
    LO: "Low Water",
    LS: "Lakeshore Flood",
    LW: "Lake Wind",
    MA: "Marine",
    MF: "Dense Fog(marine)",
    MH: "Ashfall(marine)",
    MS: "Dense Smoke(marine)",
    RB: "Small Craft for Rough Bar",
    RP: "Rip Current Risk",
    SC: "Small Craft",
    SE: "Hazardous Seas",
    SI: "Small Craft for Winds",
    SM: "Dense Smoke(land)",
    SQ: "Snow Squall",
    SR: "Storm",
    SS: "Storm Surge",
    SU: "High Surf",
    SV: "Severe Thunderstorm",
    SW: "Small Craft for Hazardous Seas",
    TO: "Tornado",
    TR: "Tropical Storm",
    TS: "Tsunami",
    TY: "Typhoon",
    UP: "Heavy Freezing Spray",
    WC: "Wind Chill",
    WI: "Wind",
    WS: "Winter Storm",
    WW: "Winter Weather",
    ZF: "Freezing Fog",
    ZR: "Freezing Rain",
    ZY: "Freezing Spray",
}

const Actions = {
    NEW: "New event",
    CON: "Event continued",
    EXT: "Event extended(time)",
    EXA: "Event extended(area)",
    EXB: "Event extended(both time and area)",
    UPG: "Event upgraded",
    CAN: "Event cancelled",
    EXP: "Event expired",
    COR: "Correction",
    ROU: "Routine",
}

const Significances = {
    W: "Warning",
    F: "Forecast",
    A: "Watch",
    O: "Outlook",
    Y: "Advisory",
    N: "Synopsis",
    S: "Statement",
}

module.exports = function (msg, attrs, cb) {
    if (msg) {
        //Today
        const today = new Date();
        const yearToday = today.getFullYear().toString().substring(0, today.getFullYear().toString().length - 2);
        //Recreate and format message
        const amsg = msg;
        msg = unescape(msg);
        //Parse the warning headers
        const awipsid = attrs.awipsid;//SVRJAN <- valid AWIPSID meaning Severe warning issued by Jackson Missisipi Office?
        const id = attrs.id;//event id?
        const ttaaii = attrs.ttaaii;//In the meteorological community, data is exchanged and distributed in a meteorological bulletin. Bulletins are distributed based on a communications identifier called an abbreviated heading. Abbreviated headings have the form T1T2 A1A2ii CCCC. The information encoded in a heading may identify the type of data found in the bulletin, the WMO code form used to represent the data, the geographical region which the data refers to, and/or the distribution which the data is to be given.
        //^ /r/iamverysmart
        const station = attrs.station;//office it was issued by: example: KBMX is birmingham nws office.
        const issue = attrs.issue;//issued time/date
        //See if the warning contains a valid PVTEC used for anything but hydro/flooding warnings [i think]
        const PVTEC_REGEX = new RegExp('.\....\.....\...\..\.....\.............-............');//Used for tornado warnings, severe storms.etc
        const PVTEC_TEXT_REGEX = ": /k.aaa.cccc.pp.s.####.yymmddThhnnZB-yymmddThhnnZE/"//Used for tornado warnings, severe storms.etc
        const PVTEC = msg.match(PVTEC_REGEX);//Used for tornado warnings, severe storms.etc
        //See if it is a valid HVTEC warning, this should be anything hydro/flooding related [i think].
        const HVTEC_REGEX = new RegExp('.\....\.....\...\..\.....\.............-............');//Used for hydro flooding.etc data
        const HVTEC_TEXT_REGEX = "/nwsli.s.ic.yymmddThhnnZB.yymmddThhnnZC.yymmddThhnnZE.fr"//Used for hydro flooding.etc data
        const HVTEC = msg.match(PVTEC_REGEX);//Used for tornado warnings, severe storms.etc
        const PDS = msg.includes("...THIS IS A PARTICULARLY DANGEROUS SITUATION...");
        if (PVTEC) {//If a valid PVTEC is found, usssaly used for storm warnings [other than hydro/flodding.etc]
            const data = PVTEC.toString().split(".");
            //VTEC-DATA DOC: https://www.weather.gov/media/vtec/VTEC_explanation4-18.pdf
            const productclass = data[0];//Type of product
            const action = data[1];//Is it new, was it existing, or expiring?
            const office_id = data[2];//What NWS office issued it?
            const phenomena = data[3];//What is happening?
            const significance = data[4];//What is the signifiance, is it news?
            const event_tracking = data[5];//Event tracking info, i beleive it is it's tracking code.

            //Parsing Time format
            const time_unparsed = data[6];
            const time_unparse = time_unparsed.split("-")
            const time_beggening_unparsed = time_unparse[0];
            const time_endings_unparsed = time_unparse[1];

            //Getting Time
            const time_begging = new Date(yearToday + time_beggening_unparsed.substring(0, 2) + "-" + time_beggening_unparsed.substring(2, 4) + "-" + time_beggening_unparsed.substring(4, 6) + "T" + time_beggening_unparsed.substring(7, 9) + ":" + time_beggening_unparsed.substring(9, 11) + ":00");
            const time_ending = new Date(yearToday + time_endings_unparsed.substring(0, 2) + "-" + time_endings_unparsed.substring(2, 4) + "-" + time_endings_unparsed.substring(4, 6) + "T" + time_endings_unparsed.substring(7, 9) + ":" + time_endings_unparsed.substring(9, 11) + ":00");

            if (Phenomenas[phenomena] && Significances[significance] && Actions[action]) {
                let extra_info = {};
                //Get counties

                let CountiesListed = [];//Array where counties will be stored
                let beggingSub = msg.search(Phenomenas[phenomena]+" "+Significances[significance]+" for...");//Find the begging of the counties
                let newString = msg.substring(beggingSub, msg.length);//Create a new string to get location information
                let offset = msg.substring(0, beggingSub).length;let on = 0; let at = 0;//Create an offset of how long the string is.
                newString.split("\n").find(a => {//go through new lines
                    at=at+a.length;//add a length of line, used for substr
                    if (a.search(".+") == -1 ){
                        on++;//add a new line
                        if (on == 1){//if you are on the first blank new line
                            CountiesListed = msg.substring(beggingSub,offset+at).replace(Phenomenas[phenomena]+" "+Significances[significance]+" for...","").split("\r").join(" ").split("\n").join(" ").split("           ").join(" ").split("  ").join("").split("...").join(", ");
                        }
                    }
                });

                //Return information about the warning

                function ParseAndFind(name, arr_value){//counties uses a modified version of this function, documentation can be found up there
                    if (msg.includes(name)){
                        const beggingSub = msg.search(name);
                        const newString = msg.substring(beggingSub, msg.length);
                        const offset = msg.substring(0, beggingSub).length;let on = 0; let at = 0;
                        newString.split("\n").find(a => {
                            at=at+a.length;
                            if (a.search(".+") == -1 ){
                                on++;
                                if (arr_value == "Actions" ? on == 2 : on == 1){
                                    extra_info[arr_value] = msg.substring(beggingSub,offset+at).replace(name,"").split("           ").join(" ").split("\r").join(" ").split("\n").join("").split("  ").join("");
                                }
                            }
                        });
                    }
                }

                ParseAndFind("HAZARD...", "Hazard");
                ParseAndFind("SOURCE...", "Source");
                ParseAndFind("IMPACT...", "Impact");
                ParseAndFind("Locations impacted include...", "LocationsInclude");
                ParseAndFind("PRECAUTIONARY/PREPAREDNESS ACTIONS...", "Actions");
                
                if (msg.includes("HAIL...")){
                    extra_info["Hail"] = msg.substring(msg.search("HAIL...")+"HAIL...".length, msg.substring(msg.search("HAIL..."), msg.length).search("IN")+msg.substring(0, msg.search("HAIL...")).length)+"MPH"
                }
                if (msg.includes("WIND...")){
                    extra_info["Wind"] = msg.substring(msg.search("WIND...")+"HAIL...".length, msg.substring(msg.search("WIND..."), msg.length).search("MPH")+msg.substring(0, msg.search("WIND...")).length)+"MPH"
                }
                if (msg.includes("TORNADO...")){
                    extra_info["Tornado"] = msg.substring(msg.search("TORNADO...")+"TORNADO...".length, msg.substring(msg.search("TORNADO..."), msg.length).search("\r")+msg.substring(0, msg.search("TORNADO...")).length)
                }

                //Find Coordinates

                let PolygonCoordinates = [];
                const begin = msg.search("LAT...LON "); let end;
                if (msg.search("TIME...MOT...LOC") == -1){
                    end = msg.search("$$");
                }else{
                    end = msg.search("TIME...MOT...LOC");
                }
                const parsing = msg.substring(begin, end).replace("LAT...LON ", "").split("      ").join("").split("\r").join(" ").split("\n").join(" ").split("  ").join(" ");//i hate these stupid split joins
                const parsing_arr = parsing.split(" ").slice(0, parsing.split(" ").length-1);

                for (let i = 0; i < parsing_arr.length; i=i+2){
                    let lat = parsing_arr[i];
                    let long = parsing_arr[i+1];
                    lat=lat.substring(0,2)+"."+lat.substring(2,4);
                    long=long.substring(0,2)+"."+long.substring(2,4);
                    PolygonCoordinates.push({
                        lat: lat,
                        long: long
                    })
                }
                
                //Send event to client.

                cb("EVENT", {
                    phenomena: Phenomenas[phenomena],
                    significance: Significances[significance],
                    action: Actions[action],
                    start: time_begging,
                    end: time_ending,
                    polygon: PolygonCoordinates,
                    PDS: PDS,
                    Counties: CountiesListed,
                    extras: extra_info,
                    back_data: {
                        office_id: office_id,
                        product_class: productclass,
                        event_tracking: event_tracking,
                        raw_attrs: attrs,
                        raw_msg: msg
                    }
                })


            } else {
                console.log("UNKOWN PHENNOMENAS: " + phenomena)
            }

        }

    }
}
