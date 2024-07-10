function generateMap(setMapObjs,getRandomInt){
    setMapObjs(t => []);
    // 1024 600
    let eachTileX = 28;
    let eachTileY = 20;    
    // emoji and name
    let places=[
        {emoji:"🎢",name:"park"},
        {emoji:"🛖",name:"home"},
        {emoji:"🏫",name:"school"},
        {emoji:"💒",name:"church"},
        {emoji:"🕌",name:"mosque"},
        {emoji:"🏥",name:"hospital"},
        {emoji:"🏯",name:"china"},
        {emoji:"🪐",name:"NASA"},
        {emoji:"🚢",name:"ship"},
        {emoji:"🏪",name:"fastfood"},
        {emoji:"⛺",name:"camping"},
        {emoji:"❄️",name:"snowball"},
        {emoji:"🌊",name:"surf"},
        {emoji:"⛱️",name:"beach"}
    ]        
    for(let i = 0;i<5;i++){
        let generatedX = getRandomInt(0,16) * eachTileX;
        let generatedY = getRandomInt(0,12) * eachTileY;
        let generatedEmojiNameObj = places[getRandomInt(0,places.length-1)];
        let generatedPlace = {
            emoji:generatedEmojiNameObj.emoji,
            name:generatedEmojiNameObj.name,
            xCord:generatedX,
            yCord:generatedY,
        }
        setMapObjs((t) => [...t,generatedPlace])
    }
}

export default generateMap;
