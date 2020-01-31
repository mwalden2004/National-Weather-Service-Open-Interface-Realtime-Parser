const Regexs = {
    PVTEC: new RegExp('[OTEX].(NEW|CON|EXT|EXA|EXB|UPG|CAN|EXP|COR|ROU).[A-Z]{4}.[A-Z]{2}.[WAYSFON].[0-9]{4}.[0-9]{6}T[0-9]{4}Z-[0-9]{6}T[0-9]{4}Z'),
    HVTEC: new RegExp("[a-zA-Z0-9]{4}.[A-Z0-9].[A-Z]{2}.[0-9]{6}T[0-9]{4}Z.[0-9]{6}T[0-9]{4}Z.[0-9]{6}T[0-9]{4}Z.[A-Z]{2}"),
    UGC: new RegExp("[A-Z]{2}(C|Z)[A-Z0-9]{3}-[0-9]{3}.*")
}

module.exports=Regexs;