
   
/**
 * accepts an array {start, end, medal},
 * 
 * methods: isInRange: accepts a value and searches for it and returns an object 
 */

export const Range = (ranges) => {

    function isInRange(days) {
        // const days= parseInt(milliseconds / (60 * 60 * 24 * 1000), 10);
        // console.log(days);
        let res = {}
        let inRange = false
        for (let i = 0; i < ranges.length; i++) {
            inRange = days >= ranges[i].start && days<= ranges[i].end;
            if(inRange){
                res = ranges[i];
                return{
                    inRange: inRange,
                    isTurningDay: days === ranges[i].start,
                    metadata: res
                }
            }
        }

        return{
            inRange: inRange,
            metadata: res,
            isTurningDay: false,
        }
    }

    return {
        isInRange,
    }

}