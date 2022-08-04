import { useState, useEffect } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View
} from "react-native";
import PreviewCard from "../components/PreviewCard";
import { getFavorites } from "../utils/favorites";

const styles = StyleSheet.create({
    container: { backgroundColor: "white", flex: 1 }
});

export default function Favorites({ navigation }) {
    const [favoritesList, setFavoritesList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            // Runs when navigating forward or backward to this screen
            const getFavoritesAndInfo = async () => {
                const favoritesByID = await getFavorites();

                let favorites = [];
                for (let i = 0; i < favoritesByID.length; i++) {
                    const req = await fetch(
                        `https://pokeapi.co/api/v2/pokemon/${favoritesByID[i]}`
                    );
                    const data = await req.json();

                    let pokemon = {
                        name: data.name,
                        id: data.id,
                        image: data.sprites.other["official-artwork"]
                            .front_default
                    };
                    favorites.push(pokemon);
                }

                setFavoritesList(favorites);
                setLoading(false);
            };

            getFavoritesAndInfo();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            {!loading ? (
                favoritesList.length > 0 ? (
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
                ) : (
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        <Text style={{ fontSize: 24 }}>
                            You have no favorites!
                        </Text>
                        <Text style={{ fontSize: 18, marginTop: 10 }}>
                            Go to the Home screen and add some favorites!
                        </Text>
                    </View>
                )
            ) : (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <Text style={{ fontSize: 24 }}>Loading...</Text>
                    <ActivityIndicator size="large" style={{ marginTop: 20 }} />
                </View>
            )}
        </View>
    );
}
