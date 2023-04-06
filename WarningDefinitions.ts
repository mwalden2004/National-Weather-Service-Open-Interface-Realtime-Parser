export const Cause = {
    "ER": "Excessive Rainfall",
    "SM": "Snowmelt",
    "RS": "Rain and Snowmelt",
    "DM": "Dam or Levee Failure",
    "IJ": "Ice Jam",
    "GO": "Glacier-Dammed Lake Outburst",
    "IC": "Rain and/or Snowmelt and/or Ice Jam",
    "FS": "Upstream Flooding plus Storm Surge",
    "FT": "Upstream Flooding plus Tidal Effects",
    "ET": "Elevated Upstream Flow plus Tidal Effects",
    "WT": "Wind and/or Tidal Effects",
    "DR": "Upstream Dam or Reservoir Release",
    "MC": "Other Multiple Causes",
    "OT": "Other Effects",
    "UU": "Unknown"
};

export const Actions = {
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
export const RecordType = {
    "NO": "A record flood is not expected",
    "NR": "Near record or record flood expected",
    "UU": "Flood without a period of record to compare",
    "OO": "For areal flood warnings, areal flash flood products, and flood advisories (point and areal)"
};
export const Phenomenas = {
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

export const Classes = {
    O: "Operational product",
    T: "Test product",
    E: "Experimental product",
    X: "Experimental VTEC in an Operational product"
}

export const Regexs = {
    PVTEC: new RegExp('[OTEX].(NEW|CON|EXT|EXA|EXB|UPG|CAN|EXP|COR|ROU).[A-Z]{4}.[A-Z]{2}.[WAYSFON].[0-9]{4}.[0-9]{6}T[0-9]{4}Z-[0-9]{6}T[0-9]{4}Z'),
    HVTEC: new RegExp("[a-zA-Z0-9]{4}.[A-Z0-9].[A-Z]{2}.[0-9]{6}T[0-9]{4}Z.[0-9]{6}T[0-9]{4}Z.[0-9]{6}T[0-9]{4}Z.[A-Z]{2}"),
    UGC: new RegExp("[A-Z]{2}(C|Z)[A-Z0-9]{3}-[0-9]{3}.*")
}

export const Severity = {
    N: "None",
    0: "areal flood or flash flood products",
    1: "Minor",
    2: "Moderate",
    3: "Major",
    U: "Unkown"
};

export const Significances = {
    W: "Warning",
    F: "Forecast",
    A: "Watch",
    O: "Outlook",
    Y: "Advisory",
    N: "Synopsis",
    S: "Statement",
}

type SeverityKey = keyof typeof Severity;
type CauseKey = keyof typeof Cause;
type RecordTypeKey = keyof typeof RecordType;

export type HVTEC_Type = {
    location: string;
    severity: typeof Severity[SeverityKey];
    cause: typeof Cause[CauseKey];
    start: Date;
    crest: Date;
    end: Date;
    record: typeof RecordType[RecordTypeKey];
    raw_data: {
        location: string;
        s: string;
        ic: string;
        begin: string;
        crest: string;
        end: string;
        fr: string;
    }
}

type ClassesKey = keyof typeof Classes;
type ActionsKey = keyof typeof Actions;
type PhenomenaKey = keyof typeof Phenomenas;
type SigKey = keyof typeof Significances;

export type PVTEC_Type = {
    class: typeof Classes[ClassesKey];
    action: typeof Actions[ActionsKey];
    office: string;
    phenomena: typeof Phenomenas[PhenomenaKey],
    significance: typeof Significances[SigKey],
    event_tracking_number: string;
    start: Date;
    end: Date;
    raw_data: {
        class: string;
        action: string;
        office: string;
        phenomena: string;
        significance: string;
        event_tracking_number: string;
        phenomstartena: string;
        end: string;
    }
}

export type UGC_Type = {
    State: string;
    Format: string;
    Areas: string[];
    expiration: {
        day: string;
        hour: string;
        minue: string;
    }
}

export type Attributes = any;
export type PolygonCoordinates = [number,number][];
export type ExtraInfo = {
    Hazard?: string;
    Source?: string;
    Impact?: string;
    LocationsInclude?: string;
    Actions?: string;
    Hail?: string;
    Wind?: string;
    Tornado?: string;
    Waterspout?: string;
};