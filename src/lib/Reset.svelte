<script>

    function resetLocalStorage() {
        // Clear specific local storage item
        localStorage.removeItem('questionWeights');
        localStorage.removeItem('candles');

        // Optionally reset the store to default values
        //questionWeights.set(defaultValues);

        // Additional actions after clearing local storage
        console.log('Local storage cleared and store reset to default values.');
        window.location.reload();
    }
</script>

<div style="margin-top: 60px; background-color: red; padding: 20px;">
<p style="text-align: center; color: white;">To reset question and candle weights click here</p>
<button style="margin: 0 auto 0 auto; text-align: center; display: block;" on:click={resetLocalStorage}>Reset to Default</button>
</div>
