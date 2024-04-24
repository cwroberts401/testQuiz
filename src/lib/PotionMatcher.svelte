<script>
    import { scentVals, resetQ, currentQuestion, percentMatch } from "../stores";
    import { candles } from "../candleStore";


    const potions = {
        132 : ['Lemon Fizz', 'Smokey Haze', 'Breezy Bay'],
        256 : ['Breezy Bay', 'Cheeky Rose', 'Dewy Days'],
        223 : ['Breezy Bay', 'Smokey Haze'],
        534 : ['Cheeky Rose', 'Smokey Haze', 'Toasty Vanilla'],
        241 : ['Toasty Vanilla', 'Lemon Fizz'],
        465 : ['Toasty Vanilla', 'Dewy Days', 'Cheeky Rose'],
        536 : ['Cheeky Rose', 'Smokey Haze', 'Dewy Days'],
        261 : ['Breezy Bay', 'Dewy Days', 'Lemon Fizz'],
        426 : ['Toasty Vanilla', 'Breezy Bay', 'Dewy Days'],
        243 : ['Toasty Vanilla', 'Smokey Haze']
    }

    function destructCandle(candles){
        let ansObj = {}
        candles.forEach((candle) => {
            ansObj[candle.name] = Object.values(candle.scentValues);
        })
        return ansObj
    }

    // destructure candles into key: sorted arr values
    function createPotionProfiles(scentProf, potions){
        const candlesObj = destructCandle($candles);

        const scents = Object.values(potions);

        // calc total area of each potion 
        let totArea = [];
        scents.forEach((scent) => {
            let currShape = [...candlesObj[scent[0]]]
            for (let i = 1; i < scent.length; i++){
                for (let j = 0; j < currShape.length; j++){
                    currShape[j] = Math.max(Number(currShape[j]), Number(candlesObj[scent[i]][j]))
                }
                
            }
            totArea.push([...currShape])
        })

        //turn profile vals into ordered array
        const profileVals = []
        Object.values(scentProf.values).forEach((val) => profileVals.push(Object.values(val)[0]))

        for (let i = 0; i < totArea.length; i++){
            let currArea = totArea[i];
            for (let j = 0; j < profileVals.length; j++){
                totArea[i][j] = Math.abs(currArea[j]-profileVals[j])
            }
            totArea[i] = totArea[i].reduce((acc, a) => acc + a, 0)
        }
        let leastDiff = Math.min(...totArea);

        return Object.values(potions)[totArea.indexOf(leastDiff)]

        /**const ans = totArea.map((area) => {
            for (let i = 0; i < area.length; i++){
                area[i] = Math.abs(Number(area[i])-Number(scentValsArr[i]))
            }
            //area.reduce((acc, a) => acc + a, 0)
        })

        console.log("ans: ", ans)*/
        



        
    }



    /**function findTopPotion(percentMatches, premadePotions){
        let sorted = Object.keys(percentMatches).sort((a, b) => percentMatches[b] - percentMatches[a]);
        console.log('sorted', sorted)

        let filtered = Object.values(premadePotions).filter((val) => val[0] === sorted[0]);
        console.log('filtered', filtered)

        //look for closest second scent match
        if (filtered.length > 1){
            let temp = filtered
            filtered = filtered.filter((val) => val[1] === sorted[1]);
            if (filtered.length === 0){return temp[0]}
        }

        //look for closest third scent match
        if (filtered.length > 1){
            let temp = filtered
            filtered = filtered.filter((val) => val[2] === sorted[2] && val.length > 2);
            if (filtered.length === 0){return temp[0]}
        }

        console.log('filter end', filtered)
        return filtered[0]
    }*/

    function findTopPotion(percentMatches, premadePotions){
        let perMatchFinal = {}

        Object.entries(premadePotions).forEach(([key, value]) => {
            if (value.length === 2){
                let tmp = (Number(percentMatches[value[0]]) + Number(percentMatches[value[1]]))/2;
                perMatchFinal[key] = tmp
            } else if (value.length === 3){
                let tmp = (Number(percentMatches[value[0]]) + Number(percentMatches[value[1]]) + Number(percentMatches[value[2]]))/3;
                perMatchFinal[key] = tmp
            }
        });
        let sorted = Object.keys(perMatchFinal).sort((a, b) => perMatchFinal[b] - perMatchFinal[a]);

        console.log(sorted)
        return potions[sorted[0]]
    }

    let topMatch = findTopPotion($percentMatch, potions)
    $: topMatch = findTopPotion($percentMatch, potions)
    let topMatchB = createPotionProfiles($scentVals, potions)
    $: topMatchB = createPotionProfiles($scentVals, potions)


</script>

<p>Potion Matches</p>
<div class="potions-container">
    <div class="potions-item">
<p style="font-size: 10px">this option finds per match of all components the compares to all other potions</p>
<p>Top Potion Algo A:<br>{topMatch}</p>
    </div>

    <div class="potions-item">
<p style="font-size: 10px">this option looks at total area of all scents in potion and sees what has most overlap</p>
<p>Top Potion Algo B:<br>{topMatchB}</p>
    </div>
</div>

<style>
    .potions-container{
        display: flex;
        justify-content: center;
        gap: 10px;
    }

    .potions-item {
        border: solid 1px;
        width: 35vw;
    }

    p {
        text-align: center;
    }
</style>


