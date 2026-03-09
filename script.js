const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spinButton");
const diceInput = document.getElementById("diceInput");
const betInput = document.getElementById("betInput");

const multiplierDisplay = document.getElementById("multiplier");
const winningsDisplay = document.getElementById("winnings");
const legendList = document.getElementById("legendList");

const slices = 7;

/*const sliceNames = [
"red",
"green",
"yellow",
"indigo",
"orange",
"blue",
"violet"
];*/

const sliceColors = [
"#cc0000",
"#008000",
"#ffff00",
"#2E3192",
"#ff8000",
"#0000ff",
"#92278F"
];

const wheelMultipliers = [
0.1,
0.4,
0.3,
0.9,
0.2,
0.5,
1.1
];

const diceMultipliers = [
0.1,
0.2,
0.3,
0.4,
0.5,
0.6
];

let spinning = false;
let currentRotation = 0;


/* ---------- CREATE LEGEND ---------- */

legendList.innerHTML = "";

for(let i=0;i<slices;i++){

const li = document.createElement("li");

li.innerHTML =
`<span style="
display:inline-block;
width:16px;
height:16px;
margin-right:8px;
background:${sliceColors[i]};
"></span>
${wheelMultipliers[i]}`;

legendList.appendChild(li);

}



/* ---------- SPIN ---------- */

spinButton.addEventListener("click", () => {

if(spinning) return;

const diceValue = parseInt(diceInput.value);
const bet = parseFloat(betInput.value);

if(!diceValue || diceValue < 1 || diceValue > 6){
alert("Enter dice value 1-6");
return;
}

if(!bet || bet <= 0){
alert("Enter a valid bet");
return;
}

spinning = true;

const sliceAngle = 360 / slices;

/* pick random slice */
const randomSlice = Math.floor(Math.random() * slices);

/* safety margin so it never touches borders */
const safeMargin = sliceAngle * 0.2;

/* stop somewhere safely inside the slice */
const stopAngle =
randomSlice * sliceAngle +
safeMargin +
Math.random() * (sliceAngle - safeMargin * 2);

const extraSpins =
(Math.floor(Math.random()*4)+5) * 360;

const finalRotation =
currentRotation + extraSpins + stopAngle;

wheel.style.transition =
"transform 3s cubic-bezier(.25,.1,.25,1)";

wheel.style.transform =
`rotate(${finalRotation}deg)`;


/* ---------- AFTER SPIN ---------- */

setTimeout(()=>{

currentRotation = finalRotation % 360;

wheel.style.transition = "none";
wheel.style.transform =
`rotate(${currentRotation}deg)`;


/* detect slice */

const adjustedRotation =
(360 - currentRotation + sliceAngle/2) % 360;

const sliceIndex =
Math.floor(adjustedRotation / sliceAngle);


/* multipliers */

const wheelMultiplier =
wheelMultipliers[sliceIndex];

const diceMultiplier =
diceMultipliers[diceValue-1];

const totalMultiplier =
wheelMultiplier + diceMultiplier;

const winnings =
bet * totalMultiplier;


/* display */

multiplierDisplay.textContent =
"Multiplier: " + totalMultiplier.toFixed(2);

winningsDisplay.textContent =
"Winnings: " + winnings.toFixed(2);

spinning = false;

},3000);

});