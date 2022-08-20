# BreakBuddy
A personalised break reminder utility built with Electron

BreakBuddy allows the user to create and customise an animated character that reminds them of when best to take a break

The character cycles between different facial expressions and animations (gradually increasing from lower to higher intrusiveness), which represent the time elapsed until a break should be taken. The break interval timer can be flexibly set by the user (default 60 minutes)

Consider (skim-)reading **Breakbuddy.pdf** for detailed information, which includes demonstrations, architectural decisions, and references

## To do / in progress
* Extend and improve intrusiveness functionality - currently the intrusiveness just involves increasing size, transparency, a simple taskbar notification, and moving the character around
* Improve the taskbar notification - use different messages

## Done
* Parse character resources via `character_scraper.py`
* Character customisation functionality and complete character personalisation screen
* Character is displayed outside of the tool when activated
* Input logging (for timer resets)
* Tray icon display - for when the Break Buddy is active, character creation can be re-opened via tray icon
* Complete timer functionality - user can select a break timer `(20m - 120m)`, the character will gradually become more intrusive as time passes (changing emotions / transparency). If the user is away for `3m`, the timer will reset

## character_scraper.py
* This file builds requests to iteratively create and save animated characters - used within the app for character customisation
* The structure of a character is as follows: `{male|female}_skin{0|1|}_hair{0|1|2|3}_{black|blonde|brown}_face{0|1|2}_shoes{0|1|2}_lower{0|1|2}_upper{0|1|2}_emote{0|1|2|3}`
* **Please note**: female assets are identical with the exception of hair, which is `hair{0|1|2}`
* The assets are stored in `character_resources/{male|female}.zip` (decompressed size 83.9mb)
* If you need to rebuild the assets, please use the `get_assets` function, though note that a strong connection is required

## Electron app - Development guide
First clone the project and unzip both the `male.zip` and `female.zip` files. Run `npm install` to obtain `node_modules`. Finally, run `npm start` to build the project. If you make changes, simply write `rs` in the console to recompile the changes

To compile the app into an executable program from a given instance, run the command `npm run make` - this will take a while. The distributable installer will then be located in `out/make/make/squirrel.windows/x64`

Local cache is stored at `C:\Users\<username>\AppData\Roaming\breakbuddy` on Windows, `/Users/<username>/Library/Application Support/breakbuddy/Cache` on OS X, and `/home/<username>/.config/breakbuddy/Cache` on Linux. You can completely wipe the folder to reset the app to the installation state (e.g., when you need to test data persistance)
