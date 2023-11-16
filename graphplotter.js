// Function to plot the graph
function plotGraph() {
    try {
        // Get the input mathematical function
        const inputFunction = document.getElementById('mathFunction').value;

        // Parse the mathematical function using math.js
        const parsedFunction = math.parse(inputFunction);

        // Compile the function
        const compiledFunction = parsedFunction.compile();

        // Get the canvas element
        const canvas = document.getElementById('myChart');
        const ctx = canvas.getContext('2d');

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the grid with axes
        drawGrid(ctx, canvas.width, canvas.height);

        // Generate x values
        const xValues = Array.from({ length: 100 }, (_, i) => i / 10 - 5);

        // Evaluate the function for each x value
        const yValues = xValues.map(x => compiledFunction.evaluate({ x: x }));

        // Plot the function
        ctx.beginPath();
        ctx.moveTo(getPixelX(canvas.width, xValues[0]), getPixelY(canvas.height, yValues[0]));

        for (let i = 1; i < xValues.length; i++) {
            const x = getPixelX(canvas.width, xValues[i]);
            const y = getPixelY(canvas.height, yValues[i]);
            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = 'rgba(75, 192, 192, 1)';
        ctx.stroke();
    } catch (error) {
        console.error('Error compiling or evaluating the function:', error.message);
    }
}

// Function to draw the grid with axes and labels
function drawGrid(ctx, width, height) {
    const gridSize = 20;

    // Set the color and line width for the grid and axes
    ctx.strokeStyle = 'lightgray';
    ctx.lineWidth = 1;
    ctx.font = '10px Arial';
    ctx.fillStyle = 'black';

    // Draw horizontal grid lines and the x-axis
    for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        // Add y-axis labels
        if (y !== height / 2) {
            ctx.fillText(((height / 2 - y) / (height / 2) * 5).toFixed(1), width / 2 + 5, y + 10);
        }
    }
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.fillText('0', width / 2 + 5, height / 2 - 5);

    // Draw vertical grid lines and the y-axis
    for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
        // Add x-axis labels
        if (x !== width / 2) {
            ctx.fillText(((x - width / 2) / (width / 2) * 5).toFixed(1), x + 2, height / 2 + 15);
        }
    }
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    ctx.fillText('0', width / 2 + 5, height / 2 + 15);
}

// Helper function to get x-coordinate in pixels
function getPixelX(canvasWidth, xValue) {
    return canvasWidth * ((xValue + 5) / 10);
}

// Helper function to get y-coordinate in pixels
function getPixelY(canvasHeight, yValue) {
    return canvasHeight - canvasHeight * ((yValue + 5) / 10);
}
