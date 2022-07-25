import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    Text,
    ScrollView,
    View,
} from "react-native";
import Alert from "./components/Alert";
import PreviewCard from "./components/PreviewCard";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "#cbd5e0",
        fontSize: 18,
        padding: 15,
    },
});

export default function App() {
    const [searchInput, updateSearchInput] = useState("");
    const [error, setError] = useState("");
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonPreviewData, setPokemonPreviewData] = useState([]);
    const updatePokemonPreviewData = (name, image, id) => {
        setPokemonPreviewData(prevState => [...prevState, { name, image, id }]);
    };

    useEffect(() => {
        // Let's start by generating a random list of Pokemon!
        // https://pokeapi.co/api/v2/pokemon/<random ID within 1 - 1154>
        // according to https://pokeapi.co/api/v2/pokemon?limit=1
        // EXERCISE: Edit this code so the same Pokemon can't be chosen again!
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=-1`)
            .then(res => res.json())
            .then(json => {
                // Save this data to local storage for fuzzy search feature later on
                setPokemonList(json.results);
                setPokemonPreviewData([]);
                const range = json.count - 2;
                for (let i = 0; i < 10; i++) {
                    const randomPokemon =
                        json.results[Math.floor(Math.random() * range)];
                    fetch(randomPokemon.url)
                        .then(res => res.json())
                        .then(pokemonData =>
                            updatePokemonPreviewData(
                                pokemonData.name,
                                pokemonData.sprites.other["official-artwork"]
                                    .front_default,
                                pokemonData.id
                            )
                        )
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        async function search() {
            if (searchInput) {
                // Apply basic fuzzy search
                // EXERCISE: Research more on how to optimize this, both in terms of search algorithm, or for a more React Native based challenge, scroll-based loading!
                await setPokemonPreviewData([]);
                setError("");
                const inp = searchInput.toLowerCase();
                const searchResults = pokemonList.filter(pokemon =>
                    pokemon.name.startsWith(inp)
                );
                if (!searchResults.length) {
                    setError("Couldn't find a matching Pokemon!");
                    return;
                }

                for (let pokemon of searchResults) {
                    fetch(pokemon.url)
                        .then(res => res.json())
                        .then(pokemonData =>
                            updatePokemonPreviewData(
                                pokemonData.name,
                                pokemonData.sprites.other["official-artwork"]
                                    .front_default,
                                pokemonData.id
                            )
                        )
                        .catch(err => console.log(err));
                }
            }
        }
        search();
    }, [searchInput]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ marginTop: 30 }}>
                    <TextInput
                        placeholder="Search for a Pokemon!"
                        style={styles.input}
                        onChangeText={updateSearchInput}
                        value={searchInput}
                    />
                </View>
                <ScrollView
                    style={{ paddingHorizontal: 15, paddingVertical: 30 }}>
                    {error ? (
                        <Alert kind="error" content={error} />
                    ) : (
                        <Alert kind="success" content="Search for a Pokemon!" />
                    )}
                    {pokemonPreviewData.length > 0 &&
                        pokemonPreviewData.map((pokemon, key) => {
                            let name = pokemon.name;
                            if (pokemon.name.includes("-")) {
                                // Format name
                                const nameArray = pokemon.name.split("-");
                                name = `${nameArray[0]} (${nameArray
                                    .slice(1)
                                    .join(" ")})`;
                            }

                            return (
                                <PreviewCard
                                    key={key}
                                    name={name}
                                    image={pokemon.image}
                                    id={pokemon.id}
                                />
                            );
                        })}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
