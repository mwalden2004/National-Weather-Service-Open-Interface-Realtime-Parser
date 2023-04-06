import { Severity, Cause, RecordType, HVTEC_Type } from "../WarningDefinitions";


export default class HVTEC_Parser{ // https://www.weather.gov/media/vtec/VTEC_explanation4-18.pdf
    hvtec: HVTEC_Type;
    constructor(hvtec: string){
        const split_vtec = hvtec.split(".") as [
            string,
            keyof typeof Severity,
            keyof typeof Cause,
            string,
            string,
            string,
            keyof typeof RecordType,
        ];
        const dates = [split_vtec[3],split_vtec[4],split_vtec[5]];

        this.hvtec = {
            location: split_vtec[0],
            severity: Severity[split_vtec[1]],
            cause: Cause[split_vtec[2]],
            start:new Date(new Date().getFullYear().toString().substring(0, new Date().getFullYear().toString().length - 2) + dates[0].substring(0, 2) + "-" + dates[0].substring(2, 4) + "-" + dates[0].substring(4, 6) + "T" + dates[0].substring(7, 9) + ":" + dates[0].substring(9, 11) + ":00"),
            crest:new Date(new Date().getFullYear().toString().substring(0, new Date().getFullYear().toString().length - 2) + dates[1].substring(0, 2) + "-" + dates[1].substring(2, 4) + "-" + dates[1].substring(4, 6) + "T" + dates[1].substring(7, 9) + ":" + dates[1].substring(9, 11) + ":00"),
            end:new Date(new Date().getFullYear().toString().substring(0, new Date().getFullYear().toString().length - 2) + dates[2].substring(0, 2) + "-" + dates[2].substring(2, 4) + "-" + dates[2].substring(4, 6) + "T" + dates[2].substring(7, 9) + ":" + dates[2].substring(9, 11) + ":00"),
            record: RecordType[split_vtec[6]],
            raw_data: {
                location:split_vtec[0],
                //@ts-expect-error this is ok
                s:split_vtec[1],
                ic:split_vtec[2],
                begin:split_vtec[3],
                crest:split_vtec[4],
                end:split_vtec[5],
                fr:split_vtec[6],
            }
        }
    }

    return(){
        return this.hvtec;
    }
}