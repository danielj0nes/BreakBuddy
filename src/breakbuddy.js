// Character customisation core functionality
const Store = require("electron-store");
const store = new Store();

// Grab elements from the customisation page
let characterImage = document.getElementById("breakbuddy-main");

const defaultMale = "../character_resources/male/male_skin0_hair0_black_face0_shoes0_lower0_upper0_emote0.gif"
const defaultFemale = "../character_resources/female/female_skin0_hair0_black_face0_shoes0_lower0_upper0_emote0.gif"

// Load presets
if (typeof store.get("characterPreset") !== "undefined") characterImage.src = store.get("characterPreset");
else characterImage.src = defaultMale;

let windowTopBar = document.createElement('div')
windowTopBar.style.width = "100%"
windowTopBar.style.height = "20px"
windowTopBar.style.backgroundColor = "transparent"
windowTopBar.style.position = "absolute"
windowTopBar.style.top = windowTopBar.style.left = 0
windowTopBar.style.webkitAppRegion = "drag"
document.body.appendChild(windowTopBar)