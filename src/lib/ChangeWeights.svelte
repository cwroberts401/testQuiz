<script>
    import { questionWeights } from '../questionStore';
    import { writable, derived } from 'svelte/store';
    import { currentQuestion } from '../stores';

    let editWeights = false;

    let categoryName = '';

    const currentWeights = derived(
        [questionWeights, currentQuestion],
        ([$questionWeights, $currentQuestion]) => {
            const weightsEntry = $questionWeights.find(item => item.question === `${$currentQuestion}`);
            return weightsEntry ? weightsEntry.weights : [];
        }
    );

    let currWeights = $questionWeights

    let justSaved = false;
    
    function saveTimer() {
        setTimeout(() => {
            justSaved = false;
        }, 600);
    }


    function saveWeights() {
        questionWeights.set(currWeights)
        justSaved = true;
        saveTimer();
    }

    

    function handleInput(event) {
        let q = event.target.id;
        let tmp = event.target.name.split(' ');
        const note = tmp[0];
        const ans = tmp[1]

        currWeights[q].weights.find(obj => obj.hasOwnProperty(ans))[ans].find(obj => obj.hasOwnProperty(note))[note] = Number(event.target.value);
    }

    function saveAndRestart() {
        saveWeights();
        window.location.reload();
    }

    function closeEditor() {
        editWeights = !editWeights
    }

    function addCategory(name) {
        let update = $questionWeights;
        update[5].weights.push({[name]: [{"woody": 0},
        {"gourmand": 0},
        {"floral": 0},
        {"clean": 0},
        {"citrus": 0},
        {"fruity": 0},
        {"earthy": 0},
        {"herbal": 0}]},)
        console.log(update)
        questionWeights.set(update)
        categoryName = '';
    }

</script>

{#if $currentQuestion > 0}
<div style="text-align: center;">
    {#if !editWeights}
    <button type="button" on:click={closeEditor}>Change Question {$currentQuestion} weights</button>
    {:else}
    <button type="button" style="margin-bottom: 5px" on:click={closeEditor}>close</button>
    {/if}
</div>
{/if}
<form class='{editWeights? '': 'hidden'}'>
    <table>
        <thead>
            <tr>
                {#each $currentWeights as category (Object.keys(category)[0])}
                    <th>{Object.keys(category)[0]}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            <tr>
                {#each $currentWeights as category, catIndex (Object.keys(category)[0])}
                    <td>
                        {#each category[Object.keys(category)[0]] as weight, weightIndex (Object.keys(weight)[0])}
                            <label>
                                {Object.keys(weight)[0]}
                                <input name="{Object.keys(weight)[0]} {Object.keys(category)[0]}" id={$currentQuestion-1} type="number" min="-10" max="10" value={weight[Object.keys(weight)[0]]} on:input={handleInput}>
                            </label><br>
                        {/each}
                    </td>
                {/each}
            </tr>
        </tbody>
    </table>
    {#if $currentQuestion === 6}
        <span>add categories that are general to deduct points - Matches to specfic scent notes are already checked</span>
        <input style="width: 150px;" bind:value={categoryName} placeholder="Enter new category">
        <button on:click={() => addCategory(categoryName)}>add</button>
    {/if}
    <p class="{justSaved? 'notify':'hidden'}">weights saved!</p>
    <div style="display:flex; margin:auto; gap:5px; width: 250px; justify-content: center;">        
        <button type="button" on:click={saveWeights}>Save</button>
        <button type="button" on:click={saveAndRestart}>Save and Restart</button>
    </div>
</form>

<style>
    .notify {
        color: green;
        text-align: center;
        width: 250px;
        margin: auto;
    }
    .hidden {
        display: none;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }
    th, td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: left;
    }
    label {
        display: block;
    }
    input {
        width: 50px;
        margin-top: 5px;
    }
    button {
        margin-top: 20px;
        padding: 5px 10px;
        cursor: pointer;
    }
</style>
