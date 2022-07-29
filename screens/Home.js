import { useState, useEffect } from "react";
import {
    Alert,
    Button,
    FlatList,
    StyleSheet,
    TextInput,
    View
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
        setPokemonPreviewList(prevState => [...prevState, { name, id, image }]);

    useEffect(() => {
        // Let's start by generating a random list of Pokemon!
        const generateRandomPokemonList = async () => {
            const req = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=-1"
            );
            const data = await req.json();

            // Save this data for fuzzy search later on
            setPokemonList(data.results);

            const range = data.count - 2; // -1 returns one less result than normal, so -2 is used instead of -1
            let chosenIds = [];

            // generate 10 random ids
            for (let i = 0; i < 10 && i < data.count - 1; i++) {
                // generate a random id between 1 and the total number of pokemon
                // that hasn't been chosen yet
                let randomNumber = Math.floor(Math.random() * range);
                while (chosenIds.includes(randomNumber))
                    randomNumber = Math.floor[Math.random() * range];
                chosenIds.push(randomNumber);

                // get the rest of the info for this pokemon
                const randomPokemonReq = await fetch(
                    data.results[randomNumber].url
                );

                const randomPokemon = await randomPokemonReq.json();

                updatePokemonPreviewList(
                    format(randomPokemon.name),
                    randomPokemon.id,
                    randomPokemon.sprites.other["official-artwork"]
                        .front_default
                );
            }
        };

        generateRandomPokemonList();
    }, []);

    const search = async () => {
        if (searchInput) {
            // Apply basic fuzzy search
            // EXERCISE: Research more on how to optimize this, both in terms of search algorithm, or for a more React Native based challenge, scroll-based, on-demand lazy loading!
            const input = searchInput.toLowerCase().trim();

            const results = pokemonList.filter(pokemon =>
                pokemon.name.startsWith(input)
            );
            if (!results.length) {
                Alert.alert(
                    "Oops, there was an error!",
                    "Couldn't find a matching Pokemon!",
                    [
                        {
                            text: "OK",
                            style: "cancel"
                        }
                    ]
                );
                return;
            }

            setPokemonPreviewList([]);
            for (let result of results) {
                // Update list of preview Pokemon
                const pokemonReq = await fetch(result.url);
                const pokemon = await pokemonReq.json();
                updatePokemonPreviewList(
                    format(pokemon.name),
                    pokemon.id,
                    pokemon.sprites.other["official-artwork"].front_default
                );
            }
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
                        fontSize: 18
                    }}
                    value={searchInput}
                />
                <Button title="Search" onPress={search}>
                    Search
                </Button>
            </View>
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
        </View>
    );
}
