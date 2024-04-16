<script>
    import { scentVals, resetQ, currentQuestion } from "../stores";
    import ChangeCandleWeights from "./ChangeCandleWeights.svelte";

    export let firstSet = [0, 0, 0, 0, 0, 0, 0, 0];
    export let secondSet = [0, 0, 0, 0, 0, 0, 0, 0];
    export let scentName = 'none';
    export let alerts = [];
    let minSet = [];
    let minSet0 = [];
    let firstTriangles = [];
    let secondTriangles = [];
    let minTriangles = [];
    let firstAreas = [];
    let secondAreas = [];
    let minAreas = [];
    //const labels = ['woody','gourmand','floral','clean','citrus','fruity','earthy','herbal'];
    const labels = ['earthy','herbal','woody','gourmand','floral','clean','citrus','fruity'];

    $: {
        minSet = firstSet.map((value, i) => Math.min(value, secondSet[i]));
        minSet0 = minSet.map((value) => Math.max(value, 0));
        recalculateTriangles();
    }

    function recalculateTriangles() {
        firstTriangles = [];
        secondTriangles = [];
        minTriangles = [];
        firstAreas = [];
        secondAreas = [];
        minAreas = [];

        calculateTriangles(firstSet.map((triangle) => triangle < 0? triangle = 0: triangle), firstTriangles, firstAreas);
        calculateTriangles(secondSet, secondTriangles, secondAreas);
        calculateTriangles(minSet0, minTriangles, minAreas);
    }

    function calculateTriangles(radii, triangleList, areaList) {
        let angleAccum = 0; // Start at 0 degrees
        for (let i = 0; i < radii.length; i++) {
            const radius = radii[i];
            const nextRadius = radii[(i + 1) % radii.length];
            const x2 = radius * Math.cos(angleAccum);
            const y2 = radius * Math.sin(angleAccum);
            angleAccum += Math.PI / 4; // Increment angle by 45 degrees
            const x3 = nextRadius * Math.cos(angleAccum);
            const y3 = nextRadius * Math.sin(angleAccum);
            triangleList.push({x1: 0, y1: 0, x2, y2, x3, y3});
            const area = 0.5 * radius * nextRadius * Math.sin(Math.PI / 4);
            areaList.push(area);
        }
    }

    /**
    function findUndrawnTriangles(tri){
        console.log(tri)
        console.log(tri.length)
        for (let i = 0; i < tri.length; i++){
            if (i === 0){if (tri[i] > 0 && tri[i+1] === 0 && tri[tri.length-1] === 0){
                console.log("first is not shown")
                minTriangles[i] = Math.min
            }} else if (i < tri.length-2) {
            if (tri[i] > 0 && tri[i+1] === 0 && tri[i-1] === 0){
                console.log(`unshown triange at ${i}`)
            }} else {
                console.log(i)
                if (tri[i] > 0 && tri[i-1] === 0 && tri[0] === 0){
                console.log("last is not shown")    
                }
            }
        }
    }
    */

    $: totalFirstArea = firstAreas.reduce((a, b) => a + b, 0);
    $: totalSecondArea = secondAreas.reduce((a, b) => a + b, 0);
    $: totalMinArea = minAreas.reduce((a, b) => a + b, 0);
    $: matchPercentage = ((totalMinArea*2) / (totalFirstArea + totalSecondArea) * 100).toFixed(2);
    //$: findUndrawnTriangles(firstSet)
</script>


<div>
    <p style="text-align: center;">{scentName}</p>
    {#if alerts.length > 0}
        <p style="color: red;">**contains {alerts.join(", ")}**</p>
    {/if}
<svg width="220" height="220" viewBox="-140 -140 280 280">
    {#each Array(8) as _, i (i)}
        <text x="{120 * Math.cos(-Math.PI / 2 + i * Math.PI / 4)}"
              y="{120 * Math.sin(-Math.PI / 2 + i * Math.PI / 4)}"
              text-anchor="middle"
              alignment-baseline="middle"
              dominant-baseline="central"
              transform="translate(0, 5)"
              font-size="10px">
            {labels[i]}
        </text>
    {/each}
    <circle cx="0" cy="0" r="100" fill="none" stroke="dimgray" stroke-width="1"/>
    <circle cx="0" cy="0" r="80" fill="none" stroke="dimgray" stroke-width="1"/>
    <circle cx="0" cy="0" r="60" fill="none" stroke="dimgray" stroke-width="1"/>
    <circle cx="0" cy="0" r="40" fill="none" stroke="dimgray" stroke-width="1"/>
    <circle cx="0" cy="0" r="20" fill="none" stroke="dimgray" stroke-width="1"/>
    <circle cx="0" cy="0" r="1" fill="none" stroke="dimgray" stroke-width="1"/>
    <line x1="0" y1="100" x2="0" y2="-100" stroke="dimgray" />
    <line x1="100" y1="0" x2="-100" y2="0" stroke="dimgray" />
    <line x1="100" y1="0" x2="-100" y2="0" stroke="dimgray" />
    <line x1="-71" y1="71" x2="71" y2="-71" stroke="dimgray" />
    <line x1="71" y1="71" x2="-71" y2="-71" stroke="dimgray" />
    {#each firstTriangles as {x1, y1, x2, y2, x3, y3}, index}
    <polygon points={`0,0 ${x2},${y2} ${x3},${y3}`}
             fill="deeppink" fill-opacity="0.90"/>
    {/each}
    {#each secondTriangles as {x1, y1, x2, y2, x3, y3}}
    <polygon points={`0,0 ${x2},${y2} ${x3},${y3}`}
             fill="silver" fill-opacity="0.7" />
    {/each}
    
</svg>
<p>{((totalMinArea*2)/(totalFirstArea+totalSecondArea)*100).toFixed(2)}% match</p>
<ChangeCandleWeights candle={scentName}/>
</div>

<style>
    p {
        text-align: center;
        width: 220px;
    }
</style>
