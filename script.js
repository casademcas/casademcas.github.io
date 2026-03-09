const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spinButton");
const diceInput = document.getElementById("diceInput");
const betInput = document.getElementById("betInput");

const multiplierDisplay = document.getElementById("multiplier");
const winningsDisplay = document.getElementById("winnings");
const legendList = document.getElementById("legendList");

const slices = 7;

const sliceColors = [
    "#cc0000", // red
    "#008000", // green
    "#ffff00", // yellow
    "#2E3192", // indigo
    "#ff8000", // orange
    "#0000ff", // blue
    "#92278F"  // violet
];

// Multipliers match the color order
const wheelMultipliers = [
    0.1, // red
    0.4, // green
    0.3, // yellow
    0.9, // indigo
    0.2, // orange
    0.5, // blue
    1.1  // violet
];

const diceMultipliers = [0.1,0.2,0.3,0.4,0.5,0.6];

let spinning = false;
let currentRotation = 0;

// ---------- CREATE LEGEND ----------
legendList.innerHTML = "";
for (let i = 0; i < slices; i++) {
    const li = document.createElement("li");
    li.innerHTML = `
    <span style="
        display:inline-block;
        width:16px;
        height:16px;
        margin-right:8px;
        background:${sliceColors[i]};
        border-radius: 3px;
        border: 1px solid #fff;
    "></span>
    ${wheelMultipliers[i]}`;
    legendList.appendChild(li);
}

// ---------- SPIN ----------
spinButton.addEventListener("click", () => {
    if (spinning) return;

    const diceValue = parseInt(diceInput.value);
    const bet = parseFloat(betInput.value);

    if (!diceValue || diceValue < 1 || diceValue > 6) {
        alert("Enter dice value 1-6");
        return;
    }

    if (!bet || bet <= 0) {
        alert("Enter a valid bet");
        return;
    }

    spinning = true;

    const sliceAngle = 360 / slices;

    // Pick random slice
    const randomSlice = Math.floor(Math.random() * slices);

    // Stop exactly at the middle of the slice
    const stopAngle = randomSlice * sliceAngle + sliceAngle / 2;

    // Extra spins for smooth effect
    const extraSpins = (Math.floor(Math.random() * 4) + 5) * 360;

    const finalRotation = currentRotation + extraSpins + stopAngle;

    wheel.style.transition = "transform 3s cubic-bezier(.25,.1,.25,1)";
    wheel.style.transform = `rotate(${finalRotation}deg)`;

    setTimeout(() => {

        currentRotation = finalRotation % 360;

        wheel.style.transition = "none";
        wheel.style.transform = `rotate(${currentRotation}deg)`;

        // Detect slice exactly
        let sliceIndex = Math.floor(currentRotation / sliceAngle) % slices;
        sliceIndex = (slices - 1 - sliceIndex + slices) % slices;

        const wheelMultiplier = wheelMultipliers[sliceIndex];
        const diceMultiplier = diceMultipliers[diceValue - 1];
        const totalMultiplier = wheelMultiplier + diceMultiplier;
        const winnings = bet * totalMultiplier;

        multiplierDisplay.textContent = `Multiplier: ${totalMultiplier.toFixed(2)}`;
        winningsDisplay.textContent = `Winnings: ${winnings.toFixed(2)}`;

        spinning = false;
    }, 3000);
});
