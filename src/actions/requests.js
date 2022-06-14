export const getPokemon = (pokemon) => {
    const url = "https://pokeapi.co/api/v2/pokemon/";

    const options = {
        method: "GET",
        headers: {'Content-Type': 'application/json'},
    };

    return new Promise(resolve => {
        fetch(url + pokemon + "/", options)
            .then(response => response.json())
            .then(
                (result) => {
                    resolve(result);
                }
            )
    })
}