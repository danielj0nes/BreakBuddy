"""
BreakBuddy
Daniel G. Jones
Script to scrape animated character resources for custom character creation in the app
Credit to https://maplestory.io/ and Nexon
"""

import requests

# Generic request URL builder
def build_request(skin_tone1, skin_tone2, shoes, lower, upper, hair, face, animated=False):
    default = """https://maplestory.io/api/character/"""
    default += """{"itemId":"""+str(skin_tone1)+""","version":"227"},"""
    default += """{"itemId":"""+str(skin_tone2)+""","version":"227"},"""
    default += """{"itemId":"""+str(shoes)+""","version":"227"},"""
    default += """{"itemId":"""+str(lower)+""","version":"227"},"""
    default += """{"itemId":"""+str(upper)+""","version":"227"},"""
    default += """{"itemId":"""+str(hair)+""","version":"227"},"""
    default += """{"itemId":"""+str(face)+""","version":"227"}"""
    if animated:
        default += "/stand1/animated"
    else:
        default += "/stand1/"
    default += "?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=&flipX=false&bgColor=0,0,0,0"
    return default

# All number IDs are arbitrary, I used https://maples.im/ to obtain them graphically

# Skin tone ranges (generic, upper/lower)
st1r = [2000, 2001, 2002, 2003, 2011]
st2r = [12000, 12001, 12002, 12003, 12011]

# Female character values
f_shoes = 1072758
f_lower = 1062066
f_upper = 1042132
f_hair = 34220
f_face = 50179

# Male character values
m_shoes = 1072369
m_lower = 1062067
m_upper = 1042037
m_hair = [30660, 30020, 30030, 30050, 30120, 30810, 30450, 31070, 30240]
m_face = [20000, 20001, 20002, 20003, 20004, 20005, 20008]

# Testing

# Female
# url = build_request(st1r[i], st2r[i], f_shoes, f_lower, f_upper, f_hair, f_face)

# Male
for skin in range(len(st1r)):
    for hair in range(len(m_hair)):
        for face in range(len(m_face)):
            url = build_request(st1r[skin], st2r[skin], m_shoes, m_lower, m_upper, m_hair[hair], m_face[face])
            response = requests.get(url)
            with open(f"character_resources/male_skin{skin}_hair{hair}_face{face}.png", "wb") as f:
                f.write(response.content)
    
    # url = build_request(st1r[i], st2r[i], m_shoes, m_lower, m_upper, m_hair[i], m_face[i])
    
    
