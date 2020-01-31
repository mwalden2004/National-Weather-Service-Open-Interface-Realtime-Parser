class UGCParser{ // https://www.nws.noaa.gov/directives/sym/pd01017002curr.pdf
    
    constructor(UGC){
        
        const split = UGC.split("-");
        const PostOffice_State = split[0].substring(0,2);
        const Format = split[0].substring(2,3);
        const FIPS = split[0].substring(3,6);
        let FIPs_Areas = [FIPS];
        for (let i=1; i<= split.length-3; i++){
            FIPs_Areas.push(split[i])
        }
        const time=split[split.length-2];
        const expiration={
            day: time.substring(0,2),
            hour: time.substring(2,4),
            minue: time.substring(4,6),
        }

        this.UGC = {
            State: PostOffice_State,
            Format: Format,
            Areas: FIPs_Areas,
            expiration: expiration
        }
    }

    return(){
        return this.UGC;
    }
}

module.exports=UGCParser;