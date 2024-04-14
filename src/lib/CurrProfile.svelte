<script>
    import { scentVals, currentQuestion } from "../stores";

    // Function to extract keys and values from the object for easier rendering
    function extractKeyValuePairs(obj) {
        return Object.entries(obj).map(([key, value]) => ({ key, value }));
    }

    let currWeights = [];

    // Initialize currWeights from the scentVals store
    $: {
        currWeights = $scentVals.values.map(obj => {
            const key = Object.keys(obj)[0];
            return { key: key, value: obj[key] };
        });
    }

    // Function to update currWeights when user inputs new values
    function handleInput(index, newValue) {
        currWeights[index].value = Number(newValue);
    }

    // Function to save the updates back to the store
    function saveChanges() {
        scentVals.update(current => {
            const updatedValues = currWeights.map(weight => ({
                [weight.key]: weight.value
            }));
            return {...current, values: updatedValues};
        });
    }
</script>

{#if $currentQuestion === 0}
    <h2 style="text-align: center;">Change Starting Profile Values</h2>
    <table>  
        <tbody>
            <tr>
            {#each currWeights as {key, value}, index}
                <td>{key}:
                    <input id="{key}" type="number" min="-10" max="10" value={value} 
                        on:input={e => handleInput(index, e.target.value)}>
                </td>
            {/each}
            </tr>
        </tbody>
    </table>
    <button style="margin: 10px auto 0 auto; text-align: center; display: block;" on:click={saveChanges}>Save Changes</button>
{:else}
<h2>Current Profile Values</h2>
<table>  
    <tbody>
        <tr>
        {#each $scentVals.values as scentObj}
            {#each extractKeyValuePairs(scentObj) as { key, value }}
            
                <td>{key}: {value}</td>
            
            {/each}
        {/each}
        </tr>
    </tbody>
</table>
<p style="text-align: center; color: red">shit list: {$scentVals.shitList.join(", ")}</p>
{/if}

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
   td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
    }
</style>