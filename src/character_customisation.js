// Character customisation core functionality
const Store = require("electron-store");
const ipcRenderer = require("electron").ipcRenderer;
const store = new Store();

// Grab elements from the customisation page
let characterImage = document.getElementById("character-image");
let characterUserName = document.getElementById("character-username");
let genderButton = document.getElementById("gender-change");
let breakTimeValue = document.getElementById("break-time-value");
let breakTimeOutput = document.getElementById("break-time-output");
const breakBuddyStart = document.getElementById("breakbuddy-start");
const faceLeft = document.getElementById("face-left");
const faceRight = document.getElementById("face-right");
const hairLeft = document.getElementById("hair-left");
const hairRight = document.getElementById("hair-right");
const hairColourLeft = document.getElementById("hair-colour-left");
const hairColourRight = document.getElementById("hair-colour-right");
const skinLeft = document.getElementById("skin-left");
const skinRight = document.getElementById("skin-right");
const topLeft = document.getElementById("top-left");
const topRight = document.getElementById("top-right");
const bottomLeft = document.getElementById("bottom-left");
const bottomRight = document.getElementById("bottom-right");
const shoesLeft = document.getElementById("shoes-left");
const shoesRight = document.getElementById("shoes-right");


// Ranges are static for now, see README.md
const faceRange = 3;
const maleHairRange = 4;
const femaleHairRange = 3;
const colourRange = 3;
const skinRange = 2;
const topRange = 3;
const bottomRange = 3;
const shoesRange = 3;

const genderPaths = {"male": "../character_resources/male/", "female": "../character_resources/female/"};
const hairColours = ["black", "brown", "blonde"];
const defaultMale = "../character_resources/male/male_skin0_hair0_black_face0_shoes0_lower0_upper0_emote0.gif";
const defaultFemale = "../character_resources/female/female_skin0_hair0_black_face0_shoes0_lower0_upper0_emote0.gif";

// Load presets
if (typeof store.get("characterName") !== "undefined") characterUserName.value = store.get("characterName");
else characterUserName.value = "";
if (typeof store.get("characterPreset") !== "undefined") characterImage.src = store.get("characterPreset");
else characterImage.src = defaultMale;
if (typeof store.get("breakTime") !== "undefined") {
    breakTimeValue.value = store.get("breakTime");
    breakTimeOutput.value = store.get("breakTime");
} else {
    breakTimeValue.value = "60";
    breakTimeOutput.value = "60";
}
// Grab the current path of the character then extract just the name
function getCharacterName() {
    return characterImage.src.replace(/^.*[\\/]/, "");
};
genderButton.innerText = getCharacterName().split("_")[0];
// Helper function to loop between number values given direction and range
function cycler(direction, partNum, partRange) {
    if (direction == "left") return ((partNum - 1 % partRange) + partRange) % partRange;
    else return (partNum + 1) % partRange;
};
// Map buttons to cycle between character animations
function cycleValue(part, direction) {
    const characterName = getCharacterName();
    const characterSplit = characterName.split("_");
    const characterGender = characterSplit[0];
    let faceNum = Number(characterSplit[4][4]);
    let hairNum = Number(characterSplit[2][4]);
    let colourNum = hairColours.indexOf(characterSplit[3]);
    let skinNum = Number(characterSplit[1][4]);
    let topNum = Number(characterSplit[7][5]);
    let bottomNum = Number(characterSplit[6][5]);
    let shoesNum = Number(characterSplit[5][5]);
    switch (part) {
    case "face":
        faceNum = cycler(direction, faceNum, faceRange);
        characterImage.src = genderPaths[characterGender] + characterName.replace(/face[0-9]/, "face" + faceNum);
        break;
    case "hair":
        if (characterGender == "male") hairNum = cycler(direction, hairNum, maleHairRange);
        else hairNum = cycler(direction, hairNum, femaleHairRange);
        characterImage.src = genderPaths[characterGender] + characterName.replace(/hair[0-9]/, "hair" + hairNum);
        break;
    case "hair-colour":
        colourNum = cycler(direction, colourNum, colourRange);
        characterImage.src = genderPaths[characterGender] + characterName.replace(/black|brown|blonde/, hairColours[colourNum]);
        break;
    case "skin":
        skinNum = cycler(direction, skinNum, skinRange);
        characterImage.src = genderPaths[characterGender] + characterName.replace(/skin[0-9]/, "skin" + skinNum);
        break;
    case "top":
        topNum = cycler(direction, topNum, topRange);
        characterImage.src = genderPaths[characterGender] + characterName.replace(/upper[0-9]/, "upper" + topNum);
        break;
    case "bottom":
        bottomNum = cycler(direction, bottomNum, bottomRange);
        characterImage.src = genderPaths[characterGender] + characterName.replace(/lower[0-9]/, "lower" + bottomNum);
        break;
    case "shoes":
        shoesNum = cycler(direction, shoesNum, shoesRange);
        characterImage.src = genderPaths[characterGender] + characterName.replace(/shoes[0-9]/, "shoes" + shoesNum);
        break;
    }
    store.set("characterPreset", characterImage.src);
};
// Event handlers
genderButton.onclick = function () {
    if (genderButton.innerText == "female") {
        genderButton.innerText = "male";
        characterImage.src = defaultMale;
    }
    else {
        genderButton.innerText = "female";
        characterImage.src = defaultFemale;
    }
    store.set("characterPreset", characterImage.src);
};
faceLeft.onclick = function () {
    cycleValue("face", "left");
};
faceRight.onclick = function () {
    cycleValue("face", "right");
};
hairLeft.onclick = function () {
    cycleValue("hair", "left");
};
hairRight.onclick = function () {
    cycleValue("hair", "right");
};
hairColourLeft.onclick = function () {
    cycleValue("hair-colour", "left");
};
hairColourRight.onclick = function () {
    cycleValue("hair-colour", "right");
};
skinLeft.onclick = function () {
    cycleValue("skin", "left");
};
skinRight.onclick = function () {
    cycleValue("skin", "right");
};
topLeft.onclick = function () {
    cycleValue("top", "left");
};
topRight.onclick = function () {
    cycleValue("top", "right");
};
bottomLeft.onclick = function () {
    cycleValue("bottom", "left");
};
bottomRight.onclick = function () {
    cycleValue("bottom", "right");
};
shoesLeft.onclick = function () {
    cycleValue("shoes", "left");
};
shoesRight.onclick = function () {
    cycleValue("shoes", "right");
};
characterUserName.onblur = function () {
    store.set("characterName", characterUserName.value);
};
breakBuddyStart.onclick = function () {
    store.set("breakTime", breakTimeValue.value);
    ipcRenderer.send("startBreakbuddy", "start");
};