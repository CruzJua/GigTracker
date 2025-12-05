document.addEventListener('DOMContentLoaded', () => {
    const gigSelector = document.getElementById('gigSelector');
    const gigName = document.getElementById('gigName');
    let gigNameText = '';
    let gigId = '';
    gigSelector.addEventListener('change', () => {
        if (gigSelector.value !== 'none') {
            let [gigId, gigName] = gigSelector.value.split('|');
            gigNameText = gigName;
            console.log(gigId);
        } else {
            gigNameText = '';
        }
        gigName.textContent = gigNameText;

        // Make a fetch to the API to get the data the chart needs

        // Write the code to use Charg.js here to display the chart
    });
});