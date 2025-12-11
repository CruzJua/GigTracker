document.addEventListener('DOMContentLoaded', () => {
    const gigSelector = document.getElementById('gigSelector');
    const gigName = document.getElementById('gigName');
    let gigNameText = '';
    gigSelector.addEventListener('change', () => {
        if (gigSelector.value !== 'none') {
            selectedIndex = gigSelector.selectedIndex;
            let gigName = gigSelector.options[selectedIndex].text;
            gigNameText = gigName;
        } else {
            gigNameText = '';
        }
        gigName.textContent = gigNameText;

        // Make a fetch to the API to get the data the chart needs

        // Write the code to use Charg.js here to display the chart
    });
});