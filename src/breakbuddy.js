// Character customisation core functionality
const { ipcMain } = require("electron");
const Store = require("electron-store");
const ipcRenderer = require("electron").ipcRenderer;

const store = new Store();
const emoteRange = 4;
// Starting opacity of the character image
let characterOpacity = 0.7;
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
function getCharacterOpacity() {
    return characterImage.style.opacity;
}
// Change the character image to the next emote in order and update the opacity (from less to more)
function emoteCycle(range) {
    let characterName = getCharacterName();
    const characterSplit = characterName.split("_");
    let emoteNum = Number(characterSplit[8][5]);
    emoteNum = (emoteNum + 1) % range;
    characterImage.src = characterImage.src.replace(/emote[0-9]/, "emote" + emoteNum);
    // Handle transparency changes
    if (getCharacterOpacity() === "1") characterOpacity = 0.7;
    else characterOpacity += 0.1;
    characterImage.style.opacity = characterOpacity;
}

// Split the user-set break time into 4 parts and cycle through each emotion
let intervalBreakTime = Math.floor(totalBreakTime / emoteRange) * 60000;
let timerId = setInterval(emoteCycle, intervalBreakTime, emoteRange);
// Receive the AFK event
ipcRenderer.on("stopTimer", () => {
    characterImage.src = characterImage.src.replace(/emote[0-9]/, "emote" + 0);
    characterImage.style.opacity = 0.7;
    characterOpacity = 0.7;
    clearInterval(timerId);
    if (confirm("You took a break so the timer has restarted :-)")) timerId = setInterval(emoteCycle, intervalBreakTime, emoteRange);
    else timerId = setInterval(emoteCycle, intervalBreakTime, emoteRange);
});
