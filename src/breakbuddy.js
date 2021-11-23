// Character customisation core functionality
const Store = require("electron-store");
const ipcRenderer = require("electron").ipcRenderer;

const store = new Store();
const emoteRange = 3;
const defaultOpacity = 0.4;
// Starting opacity of the character image
let characterOpacity = 0.4;
// Grab elements from the customisation page
let characterImage = document.getElementById("breakbuddy-main");
// Load presets
characterImage.src = store.get("characterPreset");
let totalBreakTime = store.get("breakTime");
characterImage.style.opacity = characterOpacity;
// Getters
function getCharacterName() {
    return characterImage.src.replace(/^.*[\\/]/, "");
}

// Change the character image to the next emote in order and update the opacity (from less to more)
function emoteCycle(range) {
    let characterName = getCharacterName();
    const characterSplit = characterName.split("_");
    let emoteNum = Number(characterSplit[8][5]);
    // Once we reach the end of the emote range, clear the timer and hold final emotion
    if (emoteNum === 2) {
        characterImage.src = characterImage.src.replace(/emote[0-9]/, "emote" + 3);
        clearInterval(timerId);
    } else {
        emoteNum = (emoteNum + 1) % range;
        characterImage.src = characterImage.src.replace(/emote[0-9]/, "emote" + emoteNum);
    }
    // Handle transparency changes
    characterOpacity += 0.2;
    characterImage.style.opacity = characterOpacity;
}

// Split the user-set break time into 3 parts
let intervalBreakTime = Math.floor(totalBreakTime / emoteRange) * 60000;
let timerId = setInterval(emoteCycle, intervalBreakTime, emoteRange);
// Receive the AFK event
ipcRenderer.on("stopTimer", () => {
    // Reset character state and opacity back to default and restart timer
    characterImage.src = characterImage.src.replace(/emote[0-9]/, "emote" + 0);
    characterImage.style.opacity = defaultOpacity;
    characterOpacity = defaultOpacity;
    clearInterval(timerId);
    // Possible alternative for mac?
    if (confirm("You took a break so the timer has restarted :-)")) timerId = setInterval(emoteCycle, intervalBreakTime, emoteRange);
    else timerId = setInterval(emoteCycle, intervalBreakTime, emoteRange);
});
