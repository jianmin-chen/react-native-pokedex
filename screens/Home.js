import { useState, useEffect } from "react";
import {
    Alert,
    Button,
    FlatList,
    StyleSheet,
    TextInput,
    View,
    Text,
    ActivityIndicator
} from "react-native";
import PreviewCard from "../components/PreviewCard";

const styles = StyleSheet.create({
    container: { backgroundColor: "white", flex: 1 },
    input: {
        borderBottomWidth: 1,
        borderColor: "#cbd5e0",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10
    }
});

const format = name => {
    if (name.includes("-")) {
        const nameArray = name.split("-");
        return `${nameArray[0]} (${nameArray.slice(1).join(" ")})`;
    }

    return name;
};

export default function Home({ navigation }) {
    const [searchInput, setSearchInput] = useState("");
    const [pokemonList, setPokemonList] = useState([]);

    const [pokemonPreviewList, setPokemonPreviewList] = useState([]);
    const updatePokemonPreviewList = (name, id, image) =>
        setPokemonPreviewList(prevState => [{ name, id, image }, ...prevState]);

    const fetchPokemonDetails = async (url, tryNum) => {
        // give it 5 tries max
        if (tryNum > 5) {
            return;
        }

        console.log(`Fetching details for ${url}`);

        // get the rest of the info for this pokemon
        const randomPokemonReq = await fetch(url);

        const text = await randomPokemonReq.text();

        if (text.includes("Not Found")) {
            console.log("Pokemon not found!");
            return await fetchPokemonDetails(url, tryNum + 1);
        }

        // const randomPokemon = await randomPokemonReq.json();
        const randomPokemon = JSON.parse(text);

        const {
            name,
            id,
            sprites: {
                other: {
                    "official-artwork": { front_default: image }
                }
            }
        } = randomPokemon;

        return { name: format(name), id, image };
    };

    useEffect(() => {
        // Let's start by generating a random list of Pokemon!

        const processListForSearch = async mainList => {
            const pokemonList = mainList.map(pokemon => ({
                name: format(pokemon.name),
                url: pokemon.url
            }));

            setPokemonList(pokemonList);
        };

        const generateRandomPokemonList = async () => {
            const req = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=-1"
            );
            const data = await req.json();

            // Save this data for fuzzy search later on
            processListForSearch(data.results);

            const range = data.count - 2; // -1 returns one less result than normal, so -2 is used instead of -1
            let chosenIds = [];

            let promises = [];

            // generate 10 random pokemon
            for (let i = 0; i < 10 && i < data.count - 1; i++) {
                // generate a random id between 1 and the total number of pokemon
                // that hasn't been chosen yet
                let randomNumber = Math.floor(Math.random() * range);
                while (chosenIds.includes(randomNumber))
                    randomNumber = Math.floor[Math.random() * range];
                chosenIds.push(randomNumber);

                promises.push(
                    fetchPokemonDetails(data.results[randomNumber].url, 0)
                );
            }

            let chosenPokemon = await Promise.all(promises);

            // filter empty results
            chosenPokemon = chosenPokemon.filter(pokemon => pokemon);

            setPokemonPreviewList(chosenPokemon);
        };

        generateRandomPokemonList();
    }, []);

    const search = async () => {
        if (searchInput) {
            // Apply basic fuzzy search

            const input = searchInput.toLowerCase().trim();

            const results = pokemonList.filter(pokemon =>
                pokemon.name.startsWith(input)
            );

            if (!results.length) {
                setPokemonPreviewList([]);
                return;
            }

            let promises = [];

            for (let result of results) {
                promises.push(fetchPokemonDetails(result.url, 0));
            }
            let chosenPokemon = await Promise.all(promises);

            // filter empty results
            chosenPokemon = chosenPokemon.filter(pokemon => pokemon);

            setPokemonPreviewList(chosenPokemon);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <TextInput
                    autoCorrect={false}
                    onChangeText={setSearchInput}
                    placeholder="Search for a Pokemon!"
                    style={{
                        fontSize: 18,
                        flex: 1
                    }}
                    value={searchInput}
                />
                <Button title="Search" onPress={search}>
                    Search
                </Button>
            </View>

            {pokemonPreviewList.length > 0 ? (
                <FlatList
                    data={pokemonPreviewList}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <PreviewCard {...item} navigation={navigation} />
                    )}
                    contentContainerStyle={{
                        paddingTop: 30,
                        paddingBottom: 60
                    }}
                />
            ) : searchInput.length > 0 ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text style={{ fontSize: 24 }}>
                        Couldn't find a matching Pokemon!
                    </Text>
                </View>
            ) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text style={{ fontSize: 24 }}>Loading...</Text>
                    <ActivityIndicator size="large" style={{ marginTop: 20 }} />
                </View>
            )}
        </View>
    );
}
