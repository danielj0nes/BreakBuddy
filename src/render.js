// Character customisation core functionality
let characterImage = document.getElementById("character-image");
const hairLeft = document.getElementById("hair-left");
const hairRight = document.getElementById("hair-right");
const hairColourLeft = document.getElementById("hair-colour-left");
const hairColourRight = document.getElementById("hair-colour-right");
// Since we know static ranges, we can declare them here
const hairRange = 4;
const colourRange = 3;
const genderPaths = {"male": "../character_resources/male/", "female": "../character_resources/female/"};
let hairColours = ["black", "brown", "blonde"];

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
    let hairNum = Number(characterSplit[2][4]);
    let colourNum = hairColours.indexOf(characterSplit[3]);
    switch (part) {
        case "hair":
            hairNum = cycler(direction, hairNum, hairRange);
            characterImage.src = genderPaths[characterGender] + characterName.replace(/hair[0-9]/, "hair" + hairNum);
            break;
        case "hair-colour":
            colourNum = cycler(direction, colourNum, colourRange);
            characterImage.src = genderPaths[characterGender] + characterName.replace(/black|brown|blonde/, hairColours[colourNum]);
            break;
    }
}

hairLeft.onclick = function () {
    cycleValue("hair", "left")
}
hairRight.onclick = function () {
    cycleValue("hair", "right")
}
hairColourLeft.onclick = function () {
    cycleValue("hair-colour", "left")
}
hairColourRight.onclick = function () {
    cycleValue("hair-colour", "right")
}
// To do: add remaining switches...
