
async function statGen(){
    let stats = {
        profMod: 2,
        baseStats: {},
        mod: {},
        savingThrows: {},
        isProfStat: {},
        skills: {},
        isProfSkill: {}
    }
    let maxProf = 2
    let statNames = ["Strength","Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]
    let skillMod = {
        Acrobatics: "Dexterity",
        AnimalHandling: "Wisdom",
        Arcana: "Intelligence",
        Athletics: "Strength",
        Deception: "Charisma",
        History: "Intelligence",
        Insight: "Wisdom",
        Intimidation: "Charisma",
        Investigation: "Intelligence",
        Medicine: "Wisdom",
        Nature: "Intelligence",
        Perception: "Wisdom",
        Performance: "Charisma",
        Persuasion: "Charisma",
        Religion: "Intelligence",
        "Sleight of Hand": "Dexterity",
        Stealth: "Dexterity",
        Survival: "Wisdom"
    }
    //Base Stats
    for(let name of statNames){
        stats.baseStats[name] = await statMath()
    }
    //Modifier Values
    for(let name of statNames){
        stats.mod[name] = await modStatMath(stats.baseStats[name])
    }
    //Proficiencies
    await statProfGen(stats.isProfStat, statNames, maxProf) //randomly give out 2 (or maxProf) stat proficiencies
    await assignProf(stats.mod,stats.savingThrows,stats.isProfStat,statNames,stats.profMod)
    await statProfGen(stats.isProfSkill, Object.keys(skillMod), 4)

    //Skill Stats
    for(let name of Object.keys(skillMod)){
        stats.skills[name] = stats.mod[skillMod[name]]
        if(stats.isProfSkill[name]){
            stats.skills[name] += stats.profMod
        }
    }
    return stats
}

async function statProfGen(profList, namesList, maxProf){
    for(let name of namesList){
        if (!profList[name]){
            profList[name] = false
        }
        if (Math.ceil(Math.random()*2) == 2 && maxProf != 0 && !profList[name]){
            profList[name] = true
            maxProf -= 1
        }
    }
    if(maxProf != 0){
        await statProfGen(profList, namesList, maxProf)
    }
}

async function modStatMath(ModStat){
    value = Math.floor((ModStat - 10)/ 2)
    return value
}

async function assignProf(baseMod,assignList,isProf,namesList,profMod){
    for(let name of namesList){ 
        assignList[name] = baseMod[name]
        if(isProf[name]){
            assignList[name] += profMod
        }
    }
}

async function statMath(){
    let statValuesArr = [0,0,0,0]
    let statVal = 0
    for(x = 0; x < statValuesArr.length; x++){
        statValuesArr[x] = await getValue()
    }
    statValuesArr = statValuesArr.sort()
    for(x = 1; x < statValuesArr.length; x++){
        statVal += statValuesArr[x]
    }
    return statVal
}

async function getValue(){
    value = Math.round(Math.random()*5 + 1)
    return value
}

module.exports.statGen = statGen