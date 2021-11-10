// Character customisation core functionality
// Grab elements from the customisation page
let characterImage = document.getElementById("character-image");
const genderButton = document.getElementById("gender-change");
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
const characterUserName = document.getElementById("character-username");

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
const defaultMale = "../character_resources/male/male_skin0_hair0_black_face0_shoes0_lower0_upper0_emote0.gif"
const defaultFemale = "../character_resources/female/female_skin0_hair0_black_face0_shoes0_lower0_upper0_emote0.gif"

// Grab the current path of the character then extract just the name
function getCharacterName() {
    return characterImage.src.replace(/^.*[\\\/]/, '');
}
// Helper function to loop between number values given direction and range
function cycler(direction, partNum, partRange) {
    if (direction == "left") return ((partNum - 1 % partRange) + partRange) % partRange;
    else return (partNum + 1) % partRange;
}
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
}
// Event handlers
genderButton.onclick = function () {
    if (genderButton.innerText == "Male") {
        genderButton.innerText = "Female";
        characterImage.src = defaultFemale;
    }
    else {
        genderButton.innerText = "Male";
        characterImage.src = defaultMale;
    }
}
faceLeft.onclick = function () {
    cycleValue("face", "left");
}
faceRight.onclick = function () {
    cycleValue("face", "right");
}
hairLeft.onclick = function () {
    cycleValue("hair", "left");
}
hairRight.onclick = function () {
    cycleValue("hair", "right");
}
hairColourLeft.onclick = function () {
    cycleValue("hair-colour", "left");
}
hairColourRight.onclick = function () {
    cycleValue("hair-colour", "right");
}
skinLeft.onclick = function () {
    cycleValue("skin", "left");
}
skinRight.onclick = function () {
    cycleValue("skin", "right");
}
topLeft.onclick = function () {
    cycleValue("top", "left");
}
topRight.onclick = function () {
    cycleValue("top", "right");
}
bottomLeft.onclick = function () {
    cycleValue("bottom", "left");
}
bottomRight.onclick = function () {
    cycleValue("bottom", "right");
}
shoesLeft.onclick = function () {
    cycleValue("shoes", "left");
}
shoesRight.onclick = function () {
    cycleValue("shoes", "right");
}
