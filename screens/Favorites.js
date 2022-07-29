import { useState, useEffect } from "react";
import {
    Alert,
    Button,
    FlatList,
    StyleSheet,
    TextInput,
    View,
    Text
} from "react-native";
import PreviewCard from "../components/PreviewCard";
import { getFavorites } from "../utils/favorites";

const styles = StyleSheet.create({
    container: { backgroundColor: "white", flex: 1 }
});

export default function Favorites({ navigation }) {
    const [favoritesList, setFavoritesList] = useState([]);

    useEffect(() => {
        const getFavoritesAndInfo = async () => {
            const favoritesByID = await getFavorites();

            let favorites = [];

            // for each favorite, get the info and add it to the list
            for (let i = 0; i < favoritesByID.length; i++) {
                const req = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${favoritesByID[i]}`
                );
                const data = await req.json();

                let pokemon = {
                    name: data.name,
                    id: data.id,
                    image: data.sprites.other["official-artwork"].front_default
                };

                favorites.push(pokemon);
            }

            setFavoritesList(favorites);
        };
        getFavoritesAndInfo();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={favoritesList}
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
