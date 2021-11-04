"""
BreakBuddy Asset Scraper
Daniel G. Jones
Script to scrape animated character resources for custom character creation in the app
Credit to https://maplestory.io/ and Nexon Co., Ltd. for all assets
For non-commercial use only
"""
import requests

# All number IDs are arbitrary, I used https://maples.im/ to obtain them graphically
# Skin tone ranges (generic, upper/lower)
st1r = [2000, 2001]
st2r = [12000, 12001]
# Hair colour values, add to default hair ID to obtain specific colour
colours = {0: "black", 3: "blonde", 7: "brown"}
# Different types of emotes, order corresponds to focus levels
emotes = ["default", "hit", "oops", "hum"]
# Male character values
m_shoes = [1072187, 1073308, 1073444]
m_lower = [1062067, 1060114, 1061145]
m_upper = [1042036, 1042001, 1041143]
m_hair = [30020, 30030, 30120, 30400]
m_face = [20000, 20001, 20002]
# Female character values
f_shoes = [1072758, 1073008, 1072577]
f_lower = [1062066, 1062182, 1062220]
f_upper = [1042132, 1042408, 1042023]
f_hair = [31000, 30960, 30920]
f_face = [21000, 21001, 21002]

# Generic request URL builder
def build_request(skin_tone1, skin_tone2, shoes, lower, upper, hair, face, emote, animated=False):
    default = """https://maplestory.io/api/character/"""
    default += """{"itemId":"""+str(skin_tone1)+""","version":"227"},"""
    default += """{"itemId":"""+str(skin_tone2)+""","version":"227"},"""
    default += """{"itemId":"""+str(shoes)+""","version":"227"},"""
    default += """{"itemId":"""+str(lower)+""","version":"227"},"""
    default += """{"itemId":"""+str(upper)+""","version":"227"},"""
    default += """{"itemId":"""+str(hair)+""","version":"227"},"""
    default += """{"itemId":"""+str(face)
    default += ""","animationName":'"""+emote+"""',"version":"227"}/stand1/"""
    if animated:
        default += "animated"
    default += "?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=&flipX=false&bgColor=0,0,0,0"
    return default

# Obtain all assets for a character (a necessary unschönheit)
def get_assets(skin_tone1, skin_tone2, shoes, lower_body, upper_body, hair_style, face_style, male=True):
    count = 0 
    for skin in range(len(skin_tone1)):
        for hair in range(len(hair_style)):
            for colour in colours:
                for face in range(len(face_style)):
                    for shoe in range(len(shoes)):
                        for lower in range(len(lower_body)):
                            for upper in range(len(upper_body)):
                                for emote in range(len(emotes)):
                                    url = build_request(skin_tone1[skin], skin_tone2[skin], shoes[shoe], lower_body[lower], upper_body[upper], hair_style[hair]+colour, face_style[face], emotes[emote], animated=True)
                                    response = requests.get(url)
                                    if male:
                                        with open(f"character_resources/male/male_skin{skin}_hair{hair}_{colours[colour]}_face{face}_shoes{shoe}_lower{lower}_upper{upper}_emote{emote}.gif", "wb") as f:
                                            f.write(response.content)
                                            count += 1
                                    else:
                                        with open(f"character_resources/female/female_skin{skin}_hair{hair}_{colours[colour]}_face{face}_shoes{shoe}_lower{lower}_upper{upper}_emote{emote}.gif", "wb") as f:
                                            f.write(response.content)
                                            count += 1
                                    print(f"{count} / 7776 assets downloaded")

# Get a specific asset (for fixing broken assets)
def get_asset(skin_tone1, skin_tone2, shoe, lower_body, upper_body, hair_style, face_style, emote, name, male=True):
    url = build_request(skin_tone1, skin_tone2, shoe, lower_body, upper_body, hair_style, face_style, emote, animated=True)
    response = requests.get(url)
    if male:
        with open(f"character_resources/male/{name}", "wb") as f:
            f.write(response.content)
    else:
        with open(f"character_resources/female/{name}", "wb") as f:
            f.write(response.content)

if __name__ == "__main__":
    # Male assets
    get_assets(st1r, st2r, m_shoes, m_lower, m_upper, m_hair, m_face)
    # Female assets
    get_assets(st1r, st2r, f_shoes, f_lower, f_upper, f_hair, f_face, male=False)
