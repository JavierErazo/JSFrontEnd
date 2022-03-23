const types = ["type_one", "type_two"];
const stats = ["hp_val", "atk_val", "def_val", "spatk_val", "spdef_val", "spd_val"];
const moves = ["move_one", "move_two", "move_three", "move_four"];

const type_hex = [
    {type: "Normal", hex: "A8A77A"},
    {type: "Fire", hex: "EE8130"},
    {type: "Water", hex: "6390F0"},
    {type: "Electric", hex: "F7D02C"},
    {type: "Grass", hex: "7AC74C"},
    {type: "Ice", hex: "96D9D6"},
    {type: "Fighting", hex: "C22E28"},
    {type: "Poison", hex: "A33EA1"},
    {type: "Ground", hex: "E2BF65"},
    {type: "Flying", hex: "A98FF3"},
    {type: "Psychic", hex: "F95587"},
    {type: "Bug", hex: "A6B91A"},
    {type: "Rock", hex: "B6A136"},
    {type: "Ghost", hex: "735797"},
    {type: "Dragon", hex: "6F35FC"},
    {type: "Dark", hex: "705746"},
    {type: "Stell", hex: "B7B7CE"},
    {type: "Fairy", hex: "D685AD"}
];


const fetchPokemon = () => {
    const pokeName = document.getElementById("pokeName_input");
    let pokeInput = pokeName.value.toLowerCase();    
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) => {
        if(res.status != "200"){
            console.log(res);
            setPokeImage("../images/nodata.jpg");
            setPokeData("", "pokemon_name", false);
            resetPokeData(types);
            resetPokeData(stats);
            resetPokeData(moves);

        }else{
            return res.json();  
        } 
    }).then((data) =>{
        console.log(data);
        let pokeImg = data.sprites.front_default;
        let pokeName = data.name;
        let pokeNumber = data.id;
        setPokeImage(pokeImg);
        setPokeData("No." + pokeNumber + " " + pokeName.toUpperCase(), "pokemon_name", false);
        
        /*set types*/
        for(i = 0; i < data.types.length; i++){
            setPokeData(data.types[i].type.name.toUpperCase(), types[i], false);
        }
        
        /*set stats*/
        for(i = 0; i < data.stats.length; i++){
            setPokeData(data.stats[i].base_stat, stats[i], false);
        }

        /*set moves*/
        for(i = 0; i < data.moves.length; i++){
            if(moves[i] == null){
                break;
            }
            setPokeData(data.moves[i].move.name.toUpperCase(), moves[i], false);
        }

    })
}


const setPokeImage = (url) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}

const setPokeData = (data, id, reset) => {
    const pokeElement = document.getElementById(id);
    setPokeString(pokeElement, data);
    if(pokeElement.className === "typeSpan" && !reset){
        const result = type_hex.find( hex  => hex.type.toUpperCase() === data.toUpperCase());
        pokeElement.style.backgroundColor = "#" + result.hex;
    }else{
        if(pokeElement.className === "typeSpan"){
            pokeElement.style.backgroundColor = "";
        }
    }
}

const setPokeString = (element, string) => {
    element.innerHTML = "";
    element.innerHTML += string;
}

const resetPokeData = (array) =>{
    for(i = 0; i < array.length; i++){
        setPokeData("", array[i], true);
    }
}

const imprimir = () => {
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value;
    console.log("Hola "  + pokeInput);
}