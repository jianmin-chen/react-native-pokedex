import { useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { addFavorite, isFavorite, removeFavorite } from "../utils/favorites";

export default function AddRemoveFavoriteButton() {
    const route = useRoute();
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        const {
            params: { id }
        } = route;

        // Check if the Pokemon is a favorite
        isFavorite(id).then(favorite => {
            // If it is a favorite, set the favorite state to true
            favorite && setFavorite(true);
        });
    }, []);

    const toggleFavorite = () => {
        // Get the Pokemon ID from the route
        const {
            params: { id }
        } = route;

        if (favorite) {
            // If the Pokemon is a favorite, remove it from the favorites
            removeFavorite(id);
            setFavorite(false);
        } else {
            // Otherwise, add it to favorites
            addFavorite(id);
            setFavorite(true);
        }
    };

    return (
        <TouchableOpacity
            onPress={toggleFavorite}
            style={{
                marginRight: 15
            }}>
            <Text
                style={{
                    color: "#007aff",
                    fontSize: 17,
                    letterSpacing: 0.35
                }}>
                {favorite ? "Remove" : "Add"}
            </Text>
        </TouchableOpacity>
    );
}
