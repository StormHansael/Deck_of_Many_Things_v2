require("dotenv").config()
const cardsSchem = require("./scheema")
const backup = require("./cards_backup")


const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
const cors = require('cors');
app.use(cors({ 
    origin: 'http://localhost:3000', 
    credentials: true,
}));

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("err", (err)=> console.log(err))
db.once("open", ()=> console.log("Connected to DB"))

const Cards = [
    ["Balance", "Your mind suffers a wrenching alteration, causing your Alignment to change. Lawful becomes chaotic, good becomes evil, and vice versa. If you are true neutral or unaligned, this card has no Effect on you." ], 
    ["Comet", "If you single-handedly defeat the next Hostile monster or group of Monsters you encounter, you gain Experience Points enough to gain one level. Otherwise, this card has no Effect."],
    ["Dungeon", "You disappear and become entombed in a state of suspended animation in an extradimensional Sphere. Everything you were wearing and carrying stays behind in the space you occupied when you disappeared. You remain Imprisoned until you are found and removed from the Sphere. You can't be located by any Divination magic, but a wish spell can reveal the Location of your prison. You draw no more cards."],
    ["Euryale","The card's medusa-like visage Curses you. You take a -2 penalty on Saving Throws while Cursed in this way. Only a god or the magic of The Fates card can end this curse."],
    ["Fates", "Reality's fabric unravels and spins anew, allowing you to avoid or erase one event as if it never happened. You can use the card's magic as soon as you draw the card or at any other time before you die."],
    ["Flames", " A powerful devil becomes your enemy. The devil seeks your ruin and plagues your life, savoring your suffering before attempting to slay you. This enmity lasts until either you or the devil dies."],
    ["Fool", "You lose 10,000 XP, discard this card, and draw from the deck again, counting both draws as one of your declared draws. If losing that much XP would cause you to lose a level, you instead lose an amount that leaves you with just enough XP to keep your level."],
    ["Gem", "Twenty-five pieces of jewelry worth 2,000 gp each or fifty gems worth 1,000 gp each appear at your feet."],
    ["Idiot", "Permanently reduce your Intelligence by 1d4 + 1 (to a minimum score of 1). You can draw one additional card beyond your declared draws."],
    ["Jester", "You gain 10,000 XP, or you can draw two additional cards beyond your declared draws."],
    ["Key", "A rare or rarer Magic Weapon with which you are proficient appears in your hands. The DM chooses the weapon."],
    ["Knight", "You gain the service of a 4th-level Fighter who appears in a space you choose within 30 feet of you. The Fighter is of the same race as you and serves you loyally until death, believing the fates have drawn him or her to you. You control this character."],
    ["Moon", "You are granted the ability to cast the wish spell 1d3 times."],
    ["Rogue", "A nonplayer character of the DM's choice becomes Hostile toward you. The identity of your new enemy isn't known until the NPC or someone else reveals it. Nothing less than a wish spell or Divine Intervention can end the NPC's hostility toward you."],
    ["Ruin", "All forms of Wealth that you carry or own, other than magic items, are lost to you. Portable property vanishes. Businesses, buildings, and land you own are lost in a way that alters reality the least. Any documentation that proves you should own something lost to this card also disappears."],
    ["Skull", "You summon an avatar of death-a ghostly Humanoid Skeleton clad in a tattered black robe and carrying a spectral scythe. It appears in a space of the DM's choice within 10 feet of you and ATTACKS you, warning all Others that you must win the battle alone. The avatar fights until you die or it drops to 0 Hit Points, whereupon it disappears. If anyone tries to help you, the helper summons its own Avatar of Death. A creature slain by an Avatar of Death can't be restored to life."],
    ["Star", "Increase one of your Ability Scores by 2. The score can exceed 20 but can't exceed 24."],
    ["Sun", "You gain 50,000 XP, and a wondrous item (which the DM determines randomly) appears in your hands."],
    ["Talons", "Every magic item you wear or carry disintegrates. Artifacts in your possession aren't destroyed but do Vanish."],
    ["Throne", "You gain Proficiency in the Persuasion skill, and you double your Proficiency bonus on checks made with that skill. In addition, you gain rightful ownership of a small keep somewhere in the world. However, the keep is currently in the hands of Monsters, which you must clear out before you can claim the keep as. yours."],
    ["Vizier", "At any time you choose within one year of drawing this card, you can ask a question in meditation and mentally receive a truthful answer to that question. Besides information, the answer helps you solve a puzzling problem or other dilemma. In other words, the knowledge comes with Wisdom on how to apply it."],
    ["Void", "This black card Spells Disaster. Your soul is drawn from your body and contained in an object in a place of the DM's choice. One or more powerful beings guard the place. While your soul is trapped in this way, your body is Incapacitated. A wish spell can't restore your soul, but the spell reveals the Location of the object that holds it. You draw no more cards."]
]

async function UploadCardsFromArray(req, res) {
    console.log("Works");
    try {
        for (const card of Cards) {
        const [name, description] = card;
        const newCard = new cardsSchem({ name, description });

        // Save the card document to the database
        const savedCard = await newCard.save();
        console.log('Card saved:', savedCard);
        }
    } catch (err) {
        console.error('Error saving card:', err);
    }
}

async function getCard(req, res) {
    try {
        const cards = await cardsSchem.find();
        const random = Math.floor(Math.random() * cards.length);
        res.json({name: cards[random].name, description: cards[random].description})
    } catch (error) {
        res.status(400).error
    }
}

async function getCard_Delete(req, res) {
    try {
        const cards = await cardsSchem.find();
        const random = Math.floor(Math.random() * cards.length);
        const del = await cardsSchem.findOneAndRemove({name: cards[random].name})
        console.log(del)
        res.json({name: cards[random].name, description: cards[random].description})
    } catch (error) {
        res.status(400).error
    }
}

async function shuffle(req, res){
    try {
        const cards = await backup.find()
        await cardsSchem.deleteMany()
        const insertback =  cardsSchem.insertMany(cards)
        res.status(200)
    } catch (error) {
        res.status(400).error
    }
}

app.use("/getCard", getCard)

app.use("/getCard_Delete", getCard_Delete)

app.use("/shuffle", shuffle)

app.listen(3001, () => console.log("server started"))
