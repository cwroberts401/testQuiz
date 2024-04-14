<script>
    import { candles } from "../candleStore";
    import { questionWeights } from "../questionStore";

    let showTables = false; // Tables are hidden by default

    // Handles both the 'true/false' structure and single dictionary types dynamically
    function extractWeights(weights) {
        // Check if weights is already an array of objects or just a single object
        // and convert everything to a unified format for easier processing.
        return weights.map(weight => {
            // Iterate over each category (true, false, wood, etc.)
            return Object.entries(weight).map(([category, details]) => {
                // details are arrays of objects
                const scentDetails = details.map(detail => {
                    // detail is an object like {"woody": 2}
                    return Object.entries(detail).map(([scent, value]) =>
                        `${scent}: ${value}`).join(', ');
                }).join(' | ');
                return `${category}: ${scentDetails}`;
            }).join(' | ');
        }).join(' | ');
    }

    function toggleTables() {
        showTables = !showTables; // Toggle the visibility state
    }
</script>

<button on:click={toggleTables}>
    {showTables ? 'Hide all Weights' : 'Show all Weights'}
</button>

{#if showTables}
    <h2>Candles</h2>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Scent Notes</th>
                <th>Scent Values</th>
            </tr>
        </thead>
        <tbody>
            {#each $candles as candle}
            <tr>
                <td>{candle.name}</td>
                <td>{candle.scentNotes.join(', ')}</td>
                <td>
                    {Object.entries(candle.scentValues).map(([key, value]) => `${key}: ${value}`).join(', ')}
                </td>
            </tr>
            {/each}
        </tbody>
    </table>

    <h2>Question Weights</h2>
<table>
    <thead>
        <tr>
            <th>Question</th>
            <th>Weights</th>
        </tr>
    </thead>
    <tbody>
        {#each $questionWeights as question}
        <tr>
            <td>{question.question}</td>
            <td>
                {extractWeights(question.weights)}
            </td>
        </tr>
        {/each}
    </tbody>
</table>
{/if}

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: left;
    }
</style>

