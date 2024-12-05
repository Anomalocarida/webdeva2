document.addEventListener('DOMContentLoaded', function () {
    // Existing cloud formation and slider handling code
    const tempSlider = document.getElementById('temperature');
    const humiditySlider = document.getElementById('humidity');
    const pressureSlider = document.getElementById('pressure');
    
    const tempValueDisplay = document.getElementById('tempValue');
    const humidityValueDisplay = document.getElementById('humidityValue');
    const pressureValueDisplay = document.getElementById('pressureValue');
    const cloudPreview = document.getElementById('cloudPreview');
    
    function updateSliderValues() {
        tempValueDisplay.textContent = tempSlider.value;
        humidityValueDisplay.textContent = humiditySlider.value;
        pressureValueDisplay.textContent = pressureSlider.value;
    }
    
    function updateCloudPreview() {
        const temperature = parseInt(tempSlider.value);
        const humidity = parseInt(humiditySlider.value);
        const pressure = parseInt(pressureSlider.value);
        
        if (temperature > 30 && humidity > 70 && pressure < 1000) {
            cloudPreview.textContent = 'High temperature, high humidity, and low pressure: Likely to form large clouds and rain.';
        } else if (temperature < 30 && humidity > 49 && pressure > 1010) {
            cloudPreview.textContent = 'Cool temperature, moderate humidity, and high pressure: Likely to form light clouds.';
        } else if (temperature > 25 && humidity > 60 && pressure < 1000) {
            cloudPreview.textContent = 'Warm temperature, high humidity, and low pressure: Likely to form thunderstorms.';
        } else {
            cloudPreview.textContent = 'Adjust the sliders to simulate cloud formation and rain likelihood.';
        }
    }
    
    tempSlider.addEventListener('input', function () {
        updateSliderValues();
        updateCloudPreview();
    });
    
    humiditySlider.addEventListener('input', function () {
        updateSliderValues();
        updateCloudPreview();
    });
    
    pressureSlider.addEventListener('input', function () {
        updateSliderValues();
        updateCloudPreview();
    });
    
    updateSliderValues();
    updateCloudPreview();
    
    // Raindrop Animation for Impact Section
    const startRainButton = document.getElementById('start-rain');
    const resetButton = document.getElementById('reset');
    const raindrop = document.getElementById('rain-drop');
    let rainInterval;
    let floodInterval;
    let isAnimating = false; // Track if animation is running

    // Animation control function
    function startRainAnimation() {
        if (isAnimating) return; // Prevent multiple simultaneous animations
        isAnimating = true;

        // Disable button to prevent multiple triggers
        startRainButton.disabled = true;

        // Initialize raindrop's position and size
        let dropRadius = 0;
        let dropY = 50;

        // Reset the raindrop size and position
        raindrop.setAttribute('r', dropRadius);
        raindrop.setAttribute('cy', dropY);

        // Animation interval
        rainInterval = setInterval(() => {
            // Increase size and move down
            dropRadius += 1; // Raindrop grows
            dropY += 10; // Raindrop falls

            // Update the SVG attributes
            raindrop.setAttribute('r', dropRadius);
            raindrop.setAttribute('cy', dropY);

            // Stop animation when the raindrop hits the ground
            if (dropY >= 300) {
                clearInterval(rainInterval);

                // Trigger flood animation after rain hits ground
                startFloodAnimation();
            }
        }, 80); // Adjust the speed of animation (80ms per frame)
    }

    // Flood Animation
    const floodPath = document.getElementById('flood-path');
    const animationContainer = document.getElementById('animation-container');
    let waterLevel = 350;
    let floodHeight = 0;

    function startFloodAnimation() {
        // Reset flood values
        waterLevel = 350;
        floodHeight = 0;

        floodInterval = setInterval(() => {
            floodHeight += 2; // Flood rises
            waterLevel -= 2;
            floodPath.setAttribute(
                'd',
                `M0,${waterLevel} C200,${waterLevel - 50} 600,${waterLevel - 50} 800,${waterLevel}`
            );

            // Change background dynamically
            const floodProgress = floodHeight / 50; // Adjust scale for visualization
            const redValue = Math.min(255, floodProgress * 255);
            const blueValue = Math.max(50, 255 - floodProgress * 200);
            animationContainer.style.backgroundColor = `rgb(${redValue}, 50, ${blueValue})`;

            if (floodHeight >= 50) {
                clearInterval(floodInterval);

                // Restart rain animation after flood completes
                setTimeout(() => {
                    if (isAnimating) { // Check if animation is still ongoing
                        startRainAnimation();
                    }
                }, 500); // Delay to allow flood animation to finish before restarting rain
            }
        }, 100);
    }

    // Reset Animation
    resetButton.addEventListener('click', function () {
        clearInterval(rainInterval);
        clearInterval(floodInterval);
        raindrop.setAttribute('r', 0);
        raindrop.setAttribute('cy', 50);
        startRainButton.disabled = false;
        animationContainer.style.backgroundColor = 'rgb(0, 50, 255)';
        floodPath.setAttribute('d', 'M0,350 C200,350 600,350 800,350');
        isAnimating = false;
    });

    // Start the rain animation when button is clicked
    startRainButton.addEventListener('click', startRainAnimation);
});

// Bar Chart: Rainfall Impact on Crops
document.addEventListener('DOMContentLoaded', function () {
    const barChartCanvas = document.getElementById('bar-chart');
    const barChartContext = barChartCanvas.getContext('2d');

    const rainfallData = {
        labels: ['Light Rain', 'Moderate Rain', 'Heavy Rain'],
        datasets: [
            {
                label: 'Wheat',
                data: [10, 25, 35],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Corn',
                data: [15, 30, 40],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
                label: 'Rice',
                data: [20, 35, 50],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
            },
        },
    };

    new Chart(barChartContext, {
        type: 'bar',
        data: rainfallData,
        options: barChartOptions,
    });
});

// Prevent form submission from reloading the page
    document.getElementById("health-risk-form").addEventListener("submit", function(event) {
        event.preventDefault();

        // Get the form input values
        let rainfall = parseFloat(document.getElementById("rainfall").value);
        let location = document.getElementById("location").value;
        let duration = parseFloat(document.getElementById("duration").value);

        // Variable to store health risk and message
        let healthRisk = 0;
        let riskMessage = "";

        // Calculate health risk based on rainfall and duration
        if (rainfall >= 50 && duration >= 2) {
            healthRisk = 80;  // High risk
            riskMessage = "High health risk due to prolonged heavy rainfall.";
        } else if (rainfall >= 30 && duration >= 1) {
            healthRisk = 50;  // Moderate risk
            riskMessage = "Moderate health risk due to rainfall.";
        } else {
            healthRisk = 20;  // Low risk
            riskMessage = "Low health risk, rainfall is moderate.";
        }

        // Display the health risk result
        document.getElementById("health-risk-result").innerHTML = `
            <strong>Risk Level:</strong> ${riskMessage} <br>
            <strong>Risk Score:</strong> ${healthRisk}%
        `;
    });

    // Function to show artwork modal
function showArtwork(artworkId) {
    document.getElementById(artworkId).style.display = "block";
}

// Function to close artwork modal
function closeModal(artworkId) {
    document.getElementById(artworkId).style.display = "none";
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
    var modals = document.getElementsByClassName("modal");
    for (var i = 0; i < modals.length; i++) {
        if (event.target === modals[i]) {
            modals[i].style.display = "none";
        }
    }
}

const rainContainer = document.getElementById("rain-container");
const intensitySlider = document.getElementById("intensity");
const toggleRainButton = document.getElementById("toggle-rain");
const colorPicker = document.getElementById("color");

let rainInterval;
let isRaining = false;

// Function to create a single raindrop
function createRaindrop() {
    const raindrop = document.createElement("div");
    raindrop.classList.add("raindrop");

    // Randomize position and animation duration
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 3 + 2; // 2 to 5 seconds

    raindrop.style.left = `${startX}px`;
    raindrop.style.animationDuration = `${duration}s`;
    raindrop.style.backgroundColor = colorPicker.value; // Apply selected color

    rainContainer.appendChild(raindrop);

    // Remove raindrop after animation ends
    setTimeout(() => {
        raindrop.remove();
    }, duration * 1000);
}

// Function to start generating raindrops
function startRain() {
    const interval = 600 - intensitySlider.value; // Invert intensity relationship
    rainInterval = setInterval(createRaindrop, interval);
}

// Function to stop generating raindrops
function stopRain() {
    clearInterval(rainInterval);
}

// Toggle rain on button click
toggleRainButton.addEventListener("click", () => {
    if (isRaining) {
        stopRain();
        toggleRainButton.textContent = "Start Rain";
    } else {
        startRain();
        toggleRainButton.textContent = "Stop Rain";
    }
    isRaining = !isRaining;
});

// Adjust rain intensity based on slider value
intensitySlider.addEventListener("input", () => {
    if (isRaining) {
        stopRain();
        startRain();
    }
});

// Stop rain on page load
stopRain();

    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navList = document.querySelector('nav ul');

    hamburgerMenu.addEventListener('click', function () {
        navList.classList.toggle('active');
    });
});
