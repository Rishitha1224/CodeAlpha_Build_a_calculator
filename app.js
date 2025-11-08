// Get display element
const display = document.querySelector('.display');

// Get all buttons
const buttons = document.querySelectorAll('button');

// Variable to store user input
let currentInput = "";

// Function to update the display
function updateDisplay() {
    display.value = currentInput;
}

// Add click event for each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === '=') {
            try {
                // Replace 'x' and '÷' with valid JS operators
                currentInput = currentInput.replace(/x/g, '*').replace(/÷/g, '/');
                currentInput = eval(currentInput).toString();
                updateDisplay();
            } catch {
                display.value = "Error";
                currentInput = "";
            }
        } else if (value === 'C') {
            // Clear button (if you want to add it)
            currentInput = "";
            updateDisplay();
        } else if(value === '⌫'){
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        } else {
            // Append clicked value
            currentInput += value;
            updateDisplay();
        }
    });
});

// Allow typing directly in the display
display.addEventListener('input', (e) => {
    currentInput = e.target.value;
});

// Optional: Handle keyboard input
document.addEventListener('keydown', (e) => {
    if (/[0-9+\-*/.]/.test(e.key)) {
        currentInput += e.key;
        updateDisplay();
    } else if (e.key === 'Enter') {
        try {
            currentInput = currentInput.replace(/x/g, '*').replace(/÷/g, '/');
            currentInput = eval(currentInput).toString();
            updateDisplay();
        } catch {
            display.value = "Error";
            currentInput = "";
        }
    } else if (e.key === 'Backspace' || '⌫') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    } else if (e.key === 'Escape') {
        currentInput = "";
        updateDisplay();
    }
});
