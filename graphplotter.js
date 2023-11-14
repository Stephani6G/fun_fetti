// script.js

function plotGraph() {
    // Get the input mathematical function
    const inputFunction = document.getElementById('mathFunction').value;

    // Parse the mathematical function using a library like math.js
    const parsedFunction = math.parse(inputFunction);

    // Compile the function
    const compiledFunction = parsedFunction.compile();

    // Generate x values
    const xValues = Array.from({ length: 100 }, (_, i) => i / 10 - 5);

    // Evaluate the function for each x value
    const yValues = xValues.map(x => compiledFunction.eval({ x }));

    // Get the canvas element
    const ctx = document.getElementById('myChart').getContext('2d');

    // Clear previous chart if any
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Create a new chart
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                label: inputFunction,
                borderColor: 'rgba(75, 192, 192, 1)',
                data: yValues,
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {
                    type: 'linear',
                    position: 'left'
                }
            }
        }
    });
}
