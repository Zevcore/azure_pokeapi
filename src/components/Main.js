import { Component } from "react";
import './Main.scss';

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pokemon_data: [],
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) { 
        e.preventDefault();
        
        fetch("https://pokeapi.co/api/v2/pokemon/" + e.target.pokemon.value)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    pokemon_data: result
                })
                console.log(this.state.pokemon_data);
            }
        )
        .catch(err => {
            console.log(err);
        }) 
    }

    displayPokemon() {

        var array = Object.values(this.state.pokemon_data);

        if (typeof array != "undefined" && array != null && array.length != null && array.length > 0) {
            return(
                <div className="pokemon_single">
                    <p className="pokemon_name"><span className="id">[{this.state.pokemon_data.id}]</span> {this.state.pokemon_data.name}</p> 
                    <p className="pokemon_height">Height: {this.state.pokemon_data.height}</p> 
                    <p className="pokemon_weight">Weight: {this.state.pokemon_data.weight}</p> 
                    <p className="pokemon_be">Base experience: {this.state.pokemon_data.base_experience}</p> 
                    
                    <table className="pokemon_types">
                        <tr><td>Types</td></tr>
                        {this.state.pokemon_data.types.map((item, i) => {
                            return (
                                <tr><td>{item.type.name}</td></tr>
                            )
                        })}
                    </table>

                    <table className="pokemon_view">
                        <tr><td>Type</td><td>Front</td><td>Back</td></tr>
                        <tr>
                            <td>Male</td><td><img alt="front_default" src={this.state.pokemon_data.sprites.front_default}></img></td>
                            <td><img alt="back_default" src={this.state.pokemon_data.sprites.back_default}></img></td>
                        </tr>
                        <tr>
                            <td>Female</td><td><img alt="front_female" src={this.state.pokemon_data.sprites.front_female}></img></td>
                            <td><img alt="back_female" src={this.state.pokemon_data.sprites.back_female}></img></td>
                        </tr>
                        <tr>
                            <td>Shiny</td><td><img alt="front_shiny" src={this.state.pokemon_data.sprites.front_shiny}></img></td>
                            <td><img alt="back_shiny" src={this.state.pokemon_data.sprites.back_shiny}></img></td>
                        </tr>
                    </table>

                    <table className="pokemon_moves">
                        <tr><td>Moves</td></tr>
                        {this.state.pokemon_data.moves.map((item, i) => {
                            return (
                                <tr><td>{item.move.name}</td></tr>
                            )
                        })}
                    </table>
                </div>
            )
       }
    }

    render() {
        return(
            <main className="main">
                <h1>Catch them all!</h1>
                <form className="pokeform" onSubmit={this.handleSubmit}>
                    <input name="pokemon" type="text" placeholder="Pokemon name"></input>
                    <input type="submit" value="Search" />
                </form>

                <div className="pokemon">
                   {this.displayPokemon()}
                </div>
            </main>
        )
    }
}

export default Main;