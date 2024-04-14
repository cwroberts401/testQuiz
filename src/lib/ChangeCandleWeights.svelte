<script>
    import { candles } from '../candleStore';
    
    let editing = false;

    export let candle = "null";
    let candleToEdit = 0;
    let candleProfile = {};

    // Watch for changes in the selected candle or the candles store
    $: {
        candleToEdit = $candles.findIndex(c => c.name === candle);
        if (candleToEdit !== -1) {
            // Create a deep clone to work with in the component
            candleProfile = JSON.parse(JSON.stringify($candles[candleToEdit]));
        }
    }

    const openEdit = () => {
        editing = !editing;
    };

    // Update local data
    function handleInput(scent, newValue) {
        if (candleProfile.scentValues.hasOwnProperty(scent)) {
            candleProfile.scentValues[scent] = parseInt(newValue, 10);
        }
    }

    // Save changes to the global store
    function saveChanges() {
        candles.update(allCandles => {
            allCandles.splice(candleToEdit, 1, candleProfile);
            return [...allCandles];
        });
        editing = false; // Optionally close editing mode on save
    }
</script>

<button style="margin: 0 auto 60px auto; text-align: center; display: block;" on:click={openEdit}>Edit Candle</button>

<div class={editing ? '' : 'hidden'}>
    <table>
        {#each Object.entries(candleProfile.scentValues || {}) as [scent, value]}
        <tr>
            <td>{scent}</td>
            <td>
                <input type="number" min="0" max="10" value={value}
                       on:input={e => handleInput(scent, e.target.value)} />
            </td>
        </tr>
        {/each}
    </table>
    <button on:click={saveChanges}>Save</button>
</div>

<style>
    .hidden {
        display: none;
    }
</style>
