<script>
    import { scentVals } from '../stores';
    
    let q = 0;
    function incrementQ(val){
      if (q == 1){
        if(val){
           $scentVals.woody+=3;
           $scentVals.earthy+=1;
        } else {
          $scentVals.woody-=3;
          $scentVals.earthy-=1;
        }
      }
      if (q == 2){
        if(val){
           $scentVals.fresh+=3;
           $scentVals.floral+=3;
        } else {
          $scentVals.fresh-=3;
          $scentVals.floral-=3;
        }
      }
      if (q == 3){
        if(val){
           $scentVals.warm+=3;
        } else {
          $scentVals.warm-=3;
        }
      }
      if (q == 4){
        if(val){
           $scentVals.woody+=1;
           $scentVals.earthy+=3;
        } else {
          $scentVals.woody-=1;
          $scentVals.earthy-=3;
        }
      }
      if (q == 5){
        if(val){
           $scentVals.fresh+=1;
           $scentVals.clean+=3;
        } else {
          $scentVals.fresh-=1;
          $scentVals.clean-=3;
        }
      }
      if (q == 6){  
        null
      }
      if (q == 7){
        null
      }
      q++
    }
  
    let selectedOptions = {
      'Fresh Citrus': false,
      'Warm Sweet': false,
      'Woody Smokey': false,
      'Clean Powdery': false,
      'Floral Light': false,
      'Earthy Herbal': false,
    };
  
    // This function toggles the boolean value for a given key in the selectedOptions object
    function toggleOption(option) {
      selectedOptions[option] = !selectedOptions[option];
    }
  
    // This computed value returns true if at least one option is selected
    $: isNextDisabled = !Object.values(selectedOptions).some((value) => value);
  </script>
  
  {#if q === 0}
  <button on:click={incrementQ}>start quiz</button>
  {:else if q >= 1 && q < 6}
    <div>
      {#if q===1}
        <p>Fireplace video</p>
      {:else if q===2}
        <p>Flower video</p>
      {:else if q===3}
        <p>Cookie video</p>
      {:else if q===4}
        <p>Forest video</p>
      {:else if q===5}
        <p>Beach video</p>
      {/if}
    </div>
    <button on:click={() => incrementQ(true)}> like </button>
    <button on:click={() => incrementQ(false)}> dislike </button>
  {:else if q===6}
    <div>
      <h2>Any Scents You Hate</h2>
        <button on:click={incrementQ}>Vanilla</button>
        <button on:click={incrementQ}>Wood</button>
        <button on:click={incrementQ}>Other...</button>
        <button on:click={incrementQ}>None</button>
    </div>
  {:else if q===7}
    <div>
      <h2>Are You Sensitive to Fragrance</h2>
      <button on:click={incrementQ}>Never</button>
      <button on:click={incrementQ}>Sometimes</button>
      <button on:click={incrementQ}>Always</button>
    </div>
  {:else if q===8}
    <div>
      <h2>What Are Your Fave Scents</h2>
      {#each Object.keys(selectedOptions) as scent}
        <label>
          <input type="checkbox" bind:checked={selectedOptions[scent]} on:click={() => toggleOption(scent)}>
          {scent}
        </label><br>
      {/each}
      <button on:click={incrementQ} disabled={isNextDisabled}>Next</button>
    </div>
  {:else if q===9}
    <div>
      <h2>What Are Your Fav Brands</h2>
      <button on:click={incrementQ}>Temp Next Btn</button>
    </div>
  {:else if q===10}
    <div>
      <h2>Scent World</h2>
      <button on:click={incrementQ}>I Like it</button><button on:click={incrementQ}>Not For me</button>
    </div>
  {:else}
      <p>fin</p>
  {/if}