document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('veikindaretturForm');
    const resultsDiv = document.getElementById('nidurstada');
    const totalDaysSpan = document.getElementById('totalDays');
    const usedDaysSpan = document.getElementById('usedDays');
    const remainingDaysSpan = document.getElementById('remainingDays');
    const additionalInfoP = document.getElementById('additionalInfo');

    // Error elements
    const marketError = document.getElementById('marketError');
    const starfstimiError = document.getElementById('starfstimiError');
    const notadirDagarError = document.getElementById('notadirDagarError');

    function clearErrors() {
        marketError.textContent = '';
        starfstimiError.textContent = '';
        notadirDagarError.textContent = '';
    }

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        
        // Get form values
        const market = document.querySelector('input[name="market"]:checked')?.value;
        const duration = parseInt(document.getElementById('starfstimi').value);
        const durationType = document.getElementById('starfstimiType').value;
        const usedDays = parseInt(document.getElementById('notadirDagar').value);

        // Validation
        let hasError = false;
        if (!market) {
            marketError.textContent = 'Vinsamlegast veldu markað';
            hasError = true;
        }
        if (isNaN(duration) || duration < 0) {
            starfstimiError.textContent = 'Vinsamlegast sláðu inn gildan starfstíma';
            hasError = true;
        }
        if (isNaN(usedDays) || usedDays < 0) {
            notadirDagarError.textContent = 'Vinsamlegast sláðu inn gildan fjölda notaðra daga';
            hasError = true;
        }

        if (hasError) return;

        // Convert duration to years if needed
        const durationInYears = durationType === 'mánuðir' ? duration / 12 : duration;

        let totalDays = 0;
        let message = '';

        if (market === 'almennur') {
            // Calculate for private sector
            if (durationInYears < 1) {
                // First year: 2 days per worked month
                totalDays = Math.floor(durationInYears * 12 * 2);
                message = `Á fyrsta starfsári: ${totalDays} dagar með staðgengilslaunum`;
            } else if (durationInYears < 2) {
                totalDays = 30;
                message = '1 mánuður með staðgengilslaunum';
            } else if (durationInYears < 3) {
                totalDays = 60;
                message = '1 mánuður með staðgengilslaunum og 1 mánuður á dagvinnulaunum';
            } else if (durationInYears < 5) {
                totalDays = 90;
                message = '1 mánuður með staðgengilslaunum og 2 mánuðir á dagvinnulaunum';
            } else {
                totalDays = 120;
                message = '1 mánuður með staðgengilslaunum og 3 mánuðir á dagvinnulaunum';
            }
        } else {
            // Calculate for public sector
            if (durationInYears < 1) {
                totalDays = 0;
                message = 'Þú hefur ekki náð fullum veikindarétti. Vinsamlegast hafðu samband við stéttarfélagið þitt.';
            } else if (durationInYears < 5) {
                totalDays = 90;
                message = '3 mánuðir með fullum launum';
            } else if (durationInYears < 10) {
                totalDays = 180;
                message = '6 mánuðir með fullum launum';
            } else {
                totalDays = 360;
                message = '12 mánuðir með fullum launum';
            }
        }

        // Calculate remaining days
        const remainingDays = Math.max(0, totalDays - usedDays);
        
        // Update results
        totalDaysSpan.textContent = formatNumber(totalDays);
        usedDaysSpan.textContent = formatNumber(usedDays);
        remainingDaysSpan.textContent = formatNumber(remainingDays);
        additionalInfoP.textContent = message;

        // Show results with animation
        resultsDiv.classList.remove('show');
        void resultsDiv.offsetWidth; // Trigger reflow
        resultsDiv.classList.add('show');
    });

    // Add input validation
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });
});
