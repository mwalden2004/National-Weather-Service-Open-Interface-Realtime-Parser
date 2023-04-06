import { Regexs, Attributes, PolygonCoordinates, ExtraInfo } from "../WarningDefinitions";
import HVTEC_Parser from "./HVTEC";
import PVTEC_Parser from "./PVTEC";
import UGC_Parser from "./UGC";

export default class MessageParser { // https://mesonet.agron.iastate.edu/vtec/?wfo=KBMX&phenomena=TO&significance=W&etn=20&year=2018#2019-O-NEW-KBMX-TO-W-0003/USCOMP-N0Q-201901191540
    msg: string;
    attrs: Attributes;
    PolygonCoordinates?: PolygonCoordinates;
    extra_info?: ExtraInfo;
    vtec?: PVTEC_Parser;
    hvtech?: HVTEC_Parser;
    ugc?: UGC_Parser;

    constructor(new_msg: string, new_attrs: any) {
        this.msg = unescape(new_msg);
        this.attrs = new_attrs;

        const msg = unescape(new_msg);
        const attrs = new_attrs;
        const pvtecCheck = msg.match(Regexs.PVTEC);
        const hvtecCheck = msg.match(Regexs.HVTEC);
        const ugcCheck = msg.match(Regexs.UGC);


        if (pvtecCheck && pvtecCheck && ugcCheck) {
            const vtec = new PVTEC_Parser(pvtecCheck[0]).return();
            const ugc = new UGC_Parser(ugcCheck[0]).return();


            let extra_info: any = {};

            function ParseAndFindMultiLine(name: string, arr_value: string) {
                if (!msg.includes(name)) {
                    return
                }
                const beggingSub = msg.search(name);
                const newString = msg.substring(beggingSub, msg.length);
                const offset = msg.substring(0, beggingSub).length;
                let on = 0;
                let at = 0;
                newString.split("\n").find(a => {
                    at = at + a.length;
                    if (a.search(".+") == -1) {
                        on++;
                        if (arr_value == "Actions" ? on == 2 : on == 1) {
                            extra_info[arr_value] = msg.substring(beggingSub, offset + at).replace(name, "").replace(/\s+/g, " ");
                        }
                    }
                });

            }

            function ParseAndFindOneLine(name: string, arr_value: string) {
                if (!msg.includes(name)) {
                    return;
                }
                const beggingSub = msg.search(name);
                const newString = msg.substring(beggingSub, msg.length);
                const offset = msg.substring(0, beggingSub).length;
                extra_info[arr_value] = msg.substring(beggingSub, offset + newString.search("\n")).replace(name, "").replace(/\s+/g, "");

            }

            ParseAndFindMultiLine("HAZARD...", "Hazard");
            ParseAndFindMultiLine("SOURCE...", "Source");
            ParseAndFindMultiLine("IMPACT...", "Impact");
            ParseAndFindMultiLine("Locations impacted include...", "LocationsInclude");
            ParseAndFindMultiLine("PRECAUTIONARY/PREPAREDNESS ACTIONS...", "Actions");

            ParseAndFindOneLine("HAIL...", "Hail");
            ParseAndFindOneLine("WIND...", "Wind");
            ParseAndFindOneLine("TORNADO...", "Tornado");
            ParseAndFindOneLine("WATERSPOUT...", "Waterspout");


            //Find Coordinates

            let PolygonCoordinates: PolygonCoordinates = [];
            const begin = msg.search("LAT...LON ");
            const end = msg.search("TIME...MOT...LOC") == -1 ? msg.search("$$") - 2 : msg.search("TIME...MOT...LOC") - 2;

            const parsing = msg.substring(begin, end).replace("LAT...LON ", "").replace(/\s+/g, " ");
            const parsing_arr = parsing.split(" ");

            for (let i = 0; i < parsing_arr.length; i = i + 2) {
                PolygonCoordinates.push([
                    //@ts-expect-error idk
                    -1 * new Number(parsing_arr[i]) / 100,
                    //@ts-expect-error idk
                    new Number(parsing_arr[i + 1]) / 100
                ])
            }

            this.PolygonCoordinates = PolygonCoordinates;
            this.extra_info = extra_info;
            //@ts-expect-error aint no one care
            this.vtec = vtec;
            //@ts-expect-error aint no one care
            this.ugc = ugc;
        }

        if (hvtecCheck) {
            const hvtec = new HVTEC_Parser(hvtecCheck[0]).return();
            console.log(hvtec)
            //@ts-expect-error aint no one care
            this.hvtech = hvtec;
        }
    }

    getAttrs() {
        return this.attrs;
    }

    getPolygon() {
        return this.PolygonCoordinates;
    }

    getVTEC() {
        return this.vtec;
    }

    getExtras() {
        return this.extra_info;
    }

    getMessage() {
        return this.msg;
    }

    returnInfo() {
        const toReturn = {
            header: this.vtec || this.hvtech,
            polygon: this.PolygonCoordinates,
            extra_info: this.extra_info,
            ugc: this.ugc
        }
        return toReturn;
    }


}