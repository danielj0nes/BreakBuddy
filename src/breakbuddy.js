// Character customisation core functionality
const Store = require("electron-store");
const ipcRenderer = require("electron").ipcRenderer;
const dialog = require("electron");
const store = new Store();
const emoteRange = 3;
const defaultOpacity = 0.4;
const timeMultiplier = 60000;
let nuisanceNotification;
// Starting opacity of the character image
let characterOpacity = 0.4;
let characterSize = 100;
// Grab elements from the customisation page
let characterImage = document.getElementById("breakbuddy-main");
// Load presets
characterImage.src = store.get("characterPreset");
let characterUserName = "BreakBuddy";
if (typeof store.get("characterName") !== "undefined") characterUserName = store.get("characterName");
let totalBreakTime = store.get("breakTime");
characterImage.style.opacity = characterOpacity;
const defaultHeight = characterImage.style.height;
// Getters
function getCharacterName() {
    return characterImage.src.replace(/^.*[\\/]/, "");
}
// Fix OSX bug
function osxConfirm() {
    if (window.confirm("You took a break so the timer has restarted :-)")) timerId = setInterval(emoteCycle, intervalBreakTime, emoteRange);
    else timerId = setInterval(emoteCycle, intervalBreakTime, emoteRange);
}
// Reset timer functionality
function resetTimer(timerFlag) {
    ipcRenderer.send("nuisance", "stop");
    characterImage.src = characterImage.src.replace(/emote[0-9]/, "emote" + 0);
    characterImage.style.opacity = defaultOpacity;
    characterOpacity = defaultOpacity;
    characterImage.style.height = defaultHeight;
    characterSize = 100;
    clearInterval(nuisanceNotification);
    clearInterval(timerId);
    if (timerFlag) timerId = setInterval(emoteCycle, intervalBreakTime, emoteRange);
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
        // Start the increased intrusiveness events
        ipcRenderer.send("nuisance", "start");
        nuisanceNotification = setInterval(() => {
            new Notification(characterUserName, {
                body: "Time for a break?",
                icon: "assets/icon.png"
            });
        }, timeMultiplier * 2);
    } else {
        emoteNum = (emoteNum + 1) % range;
        characterImage.src = characterImage.src.replace(/emote[0-9]/, "emote" + emoteNum);
    }
    // Handle character changes per iteration
    characterOpacity += 0.2;
    characterSize += 5; // Increase size of character by 5%
    characterImage.style.opacity = characterOpacity;
    characterImage.style.height = String(characterSize + "%");
}

// Split the user-set break time into 3 parts
let intervalBreakTime = Math.floor(totalBreakTime / emoteRange) * timeMultiplier;
let timerId = setInterval(emoteCycle, intervalBreakTime, emoteRange);

// Receive the AFK event - occurs after the break duration timer is met
ipcRenderer.on("stopTimer", () => {
    resetTimer();
    setTimeout(osxConfirm(), 500);
});

// Receive the reset event
ipcRenderer.on("resetTimer", () => {
    resetTimer(true);
});
