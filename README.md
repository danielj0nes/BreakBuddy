# BreakBuddy
A personalised break reminder utility built with Electron.

BreakBuddy allows the user to create and customise an animated character that reminds them of when best to take a break.

The character cycles between different facial expressions and animations (gradually increasing from lower to higher intrusiveness), which represent the time elapsed until a break should be taken. The break interval timer can be flexibly set by the user (default 60 minutes).  

## To do
* Finish character customisation functionality
* Work on displaying the character outside of the tool
* Work on break timers functionality
* Tracking behaviour, such as resetting the interval timer when no activity is detected after `x` amount of time.

## Done
* Parse character resources via `character_scraper.py`
* Started Electron app development - user can cycle between character hair type and hair colour. This functionality is shown in `render.js`.

## character_scraper.py
* This file builds requests to iteratively create and save animated characters - used within the app for character customisation
* The structure of a character is as follows: `{male|female}_skin{0|1|}_hair{0|1|2|3}_{black|blonde|brown}_face{0|1|2}_shoes{0|1|2}_lower{0|1|2}_upper{0|1|2}_emote{0|1|2|3}`
* Please note: female assets are identical with the exception of hair, which is `hair{0|1|2}`
* The assets are stored in `character_resources/{male|female}.zip` (decompressed size 83.9mb)
* If you need to rebuild the assets, please use the `get_assets` function, though note that a strong connection is required

## Electron app - Development guide
First clone the project and unzip both the `male.zip` and `female.zip` files. Run `npm install` to obtain `node_modules`. Finally, run `npm start` to build the project. If you make changes, simply write `rs` in the console to recompile the changes.

To compile the app into an executable program from a given instance, run the command `npm run make`
