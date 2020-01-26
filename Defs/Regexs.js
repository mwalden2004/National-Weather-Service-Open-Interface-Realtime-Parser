const Regexs = {
    VTEC: new RegExp('[OTEX].(NEW|CON|EXT|EXA|EXB|UPG|CAN|EXP|COR|ROU).[A-Z]{4}.[A-Z]{2}.[WAYSFON].[0-9]{4}.[0-9]{6}T[0-9]{4}Z-[0-9]{6}T[0-9]{4}Z'),
    WMO: new RegExp('[A-Z]{3}[A-Z0-9]{3}')
    //ALC063-119-191630-
}

module.exports=Regexs;