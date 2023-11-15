// graphplotter.js

function plotGraph() {
    // Get the input mathematical function
    const inputFunction = document.getElementById('mathFunction').value;

    try {
        // Parse the mathematical function using a library like math.js
        const parsedFunction = math.parse(inputFunction);

        // Compile the function
        const compiledFunction = parsedFunction.compile();

        // Get the canvas element
        const canvas = document.getElementById('myChart');
        const ctx = canvas.getContext('2d');

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the grid
        drawGrid(ctx, canvas.width, canvas.height);

        // Generate x values
        const xValues = Array.from({ length: 100 }, (_, i) => i / 10 - 5);

        // Evaluate the function for each x value
        const yValues = xValues.map(x => compiledFunction.eval({ x }));

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
