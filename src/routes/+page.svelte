<script>
    import { scentVals, changeVals, back, addScentToShitList, currentQuestion, incrementQ, decrementQ, resetQ} from '../stores';
    import { questionWeights } from '../questionStore';
    import ResultChart from '../lib/ResultChart.svelte';
    import ChangeWeights from '../lib/ChangeWeights.svelte';
    import CurrProfile from '../lib/CurrProfile.svelte';
    import { candles } from '../candleStore';
    import { writable, derived } from 'svelte/store';
    import Reset from '../lib/Reset.svelte';

    let alerts = {"lemon":[],"breezy":[],"smokey":[],"toasty":[],"cheeky":[],"dewy":[]};


    const multipliedValues = derived(scentVals, $scentVals => {
        return $scentVals.values.map(obj => {
            const key = Object.keys(obj)[0]; // Extract the key name (scent name)
            return Math.min(100, obj[key] * 10); // Multiply the value by 10
        });
    });

    $: lemonFizzVals = $candles.length > 0 ? Object.values($candles[0].scentValues) : [];
    $: breezyBayVals = $candles.length > 1 ? Object.values($candles[1].scentValues) : [];
    $: smokeyHazeVals = $candles.length > 2 ? Object.values($candles[2].scentValues) : [];
    $: toastyVanillaVals = $candles.length > 3 ? Object.values($candles[3].scentValues) : [];
    $: cheekyRoseVals = $candles.length > 4 ? Object.values($candles[4].scentValues) : [];
    $: dewyDaysVals = $candles.length > 5 ? Object.values($candles[5].scentValues) : [];

    function checkShitList(scentval, candle){

        for(let i = 0; i < candle.length; i++){
            let categories = $scentVals.shitList;
            for(let j = 0; j < categories.length; j++){
            if(candle[i].scentNotes.includes(categories[j])){
                let tmp = candle[i].name.split(' ');
                if (!alerts[tmp[0].toLowerCase()].includes(categories[j])){
                    alerts[tmp[0].toLowerCase()].push(categories[j]);
                }
                
            }
        }
        
       
        }
        return alerts
        
        
    }


    
    const videos = [
      "Fireplace video",
      "Flower video",
      "Cookie video",
      "Forest video",
      "Beach video"
    ];
    
    const selectedOptions = {
      'Fresh Citrus': false,
      'Warm Sweet': false,
      'Woody Smokey': false,
      'Clean Powdery': false,
      'Floral Light': false,
      'Earthy Herbal': false,
    };



    function changeValsQ(question, answer){
        console.log(answer)
        let toAdd = $questionWeights[question-1].weights.find(obj => obj.hasOwnProperty(answer))[answer]
        console.log(toAdd)
        changeVals(toAdd)
    }

    function handleScentSelect(scent){
        changeValsQ(8, scent)
        selectedOptions[scent] = true;
    }

    function restart() {
        window.location.reload();
    }

    let newScent = "";

    function handleSubmit() {
        if (newScent.trim() !== '') {
            let categories = $questionWeights[5].weights.map((tmp) => Object.keys(tmp)[0])
            if (categories.includes(newScent.trim().toLowerCase())){
                changeVals($questionWeights[5].weights.find(obj => obj.hasOwnProperty(newScent.trim().toLowerCase()))[newScent.trim().toLowerCase()])
            }
            addScentToShitList(newScent.trim().toLowerCase());
            newScent = "";
        }
    }

    $: {
        alerts = checkShitList($scentVals, $candles);
    }
    
  </script>

  <h1>Quiz v2.0</h1>
  
  {#if $currentQuestion > 0}
  <p>question #{$currentQuestion}</p>
  {/if}
  {#if $currentQuestion === 0}
    <div class="q-box">
        <button style="margin: 120px auto 0 auto; text-align: center; display: block;" on:click={incrementQ}>Start Quiz</button>
    </div>
  {:else if $currentQuestion >= 1 && $currentQuestion < 6}
    <div>
        <div class='video-player'>
            <p class='video-desc'>{videos[$currentQuestion-1]}</p>
        </div>
        <div style="text-align: center; margin-top: 10px;">
            <button on:click={() => changeValsQ($currentQuestion, 'true')} on:click={incrementQ} >Like</button>
            <button on:click={() => changeValsQ($currentQuestion, 'false')} on:click={incrementQ} >Dislike</button>
        </div>
    </div>
  {:else if $currentQuestion === 6}
  <div class="q-box">
    <h2>Any Scents You Hate</h2>
    <input style="margin: 0 auto 0 auto; display: block; width: 160px;" type="text" bind:value={newScent} placeholder="Type a scent you dislike"/>
    <button style="margin: 10px auto 0 auto; display: block;" on:click={handleSubmit}>Add to Shit List</button>
    <!-- List out current scents in the shitList -->
    <ul style="width: 300px; margin: 0 auto 0 auto;">
      {#each $scentVals.shitList as scent}
        <li>{scent}</li>
      {/each}
    </ul>
    <button style="margin: 10px auto 0 auto; display: block;" on:click={incrementQ}>{$scentVals.shitList.length > 0? 'next': 'none'}</button>
  </div>
  {:else if $currentQuestion === 7}
  <div class="q-box">
    <h2>are you sensitive to scents</h2>
    <div>
        <button style="margin: 10px auto 0 auto; display: block;" on:click={() => changeValsQ($currentQuestion, 'high')} on:click={incrementQ}>always</button>
        <button style="margin: 10px auto 0 auto; display: block;" on:click={() => changeValsQ($currentQuestion, 'mid')} on:click={incrementQ}>sometimes</button>
        <button style="margin: 10px auto 0 auto; display: block;" on:click={() => changeValsQ($currentQuestion, 'none')} on:click={incrementQ}>never</button>
    </div>
  </div>
  {:else if $currentQuestion === 8}
  <div class="q-box">
    <h2>What Are Your Fave Scents</h2>
    <div style="display:flex; justify-content:center; gap: 2px;">
    {#each Object.keys(selectedOptions) as scent}
      <button on:click={() => handleScentSelect(scent)} disabled={selectedOptions[scent]}>{scent}</button>
    {/each}
    </div>
    <button style="margin: 10px auto 0 auto; display: block;" on:click={incrementQ}>Next</button>
  </div>
  {:else if $currentQuestion === 9}
  <div class="q-box">
    <h2>**question about fave brands**</h2>
    <button style="margin: 10px auto 0 auto; display: block;" on:click={incrementQ}>Next</button>
  </div>
  {:else if $currentQuestion === 10}
  <div class="q-box">
    <h2>**question about scent worlds**</h2>
    <button style="margin: 10px auto 0 auto; display: block;" on:click={incrementQ}>Next</button>
  </div>
  {:else}
  <div class="q-box">
    <h2>**results page**</h2>
    <button style="margin: 10px auto 0 auto; display: block;" on:click={restart}>Restart</button>
  </div>
    
  {/if}
    
  {#if $currentQuestion > 0}
    <button on:click={decrementQ} on:click={back}>Back</button>
  {/if}
    <ChangeWeights />
    <CurrProfile />
    
    <h2>Charts</h2>
    <div class="charts-box">
        <ResultChart firstSet={$multipliedValues} secondSet={lemonFizzVals.map((x) => x*10)} scentName='Lemon Fizz' alerts={alerts.lemon}/>
        <ResultChart firstSet={$multipliedValues} secondSet={breezyBayVals.map((x) => x*10)} scentName='Breezy Bay' alerts={alerts.breezy}/>
        <ResultChart firstSet={$multipliedValues} secondSet={smokeyHazeVals.map((x) => x*10)} scentName='Smokey Haze' alerts={alerts.smokey}/>
        <ResultChart firstSet={$multipliedValues} secondSet={toastyVanillaVals.map((x) => x*10)} scentName='Toasty Vanilla' alerts={alerts.toasty}/>
        <ResultChart firstSet={$multipliedValues} secondSet={cheekyRoseVals.map((x) => x*10)} scentName='Cheeky Rose'alerts={alerts.cheeky}/>
        <ResultChart firstSet={$multipliedValues} secondSet={dewyDaysVals.map((x) => x*10)} scentName='Dewy Days'alerts={alerts.dewy}/>

    </div>
    <Reset />

<style>
    .charts-box{
        display: flex;
        max-width: 100vw;
        flex-wrap: wrap;
        justify-content: center;
    }
    h2 {
        text-align: center;
    }
    .q-box{
        height: 320px;
        width: 100%;
    }
    .video-player{
        width: 480px;
        height: 320px;
        background-color: gray;
        margin: auto;
    }
    .video-desc{
        color: white;
        text-align: center;
        padding-top: 120px;
    }
    h1 {
        text-align: center;
    }
</style>
  