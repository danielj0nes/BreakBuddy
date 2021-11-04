# BreakBuddy
A personalised break reminder utility

## To do
* Configure electron app
* Build utility tool to work with scraped character resources

## Done
* Parse character resources via `character_scraper.py`

## character_scraper.py
* This file builds requests to iteratively create and save animated characters - used within the app for character customisation
* The structure of a character is as follows: `{male|female}_skin{0|1|}_hair{0|1|2|3}_{black|blonde|brown}_face{0|1|2}_shoes{0|1|2}_lower{0|1|2}_upper{0|1|2}_emote{0|1|2|3}`
* Please note: female assets are identical with the exception of hair, which is `hair{0|1|2}`
* The assets are stored in `character_resources/{male|female}.zip` (decompressed size 83.9mb)
* If you need to rebuild the assets, please use the `get_assets` function, though note that a strong connection is required