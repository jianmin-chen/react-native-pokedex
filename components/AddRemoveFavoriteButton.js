import { useState, useEffect } from "react";

import { Text, TouchableOpacity } from "react-native";

import { useRoute } from "@react-navigation/native";

import { addFavorite, isFavorite, removeFavorite } from "../utils/favorites";

function AddRemoveFavoriteButton() {
    const route = useRoute();

    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        const {
            params: { id }
        } = route;

        // check if the pokemon is a favorite
        isFavorite(id).then(favorite => {
            // if it is a favorite, set the favorite state to true
            favorite && setFavorite(true);
        });
    }, []);

    const toggleFavorite = () => {
        // get the pokemon id from the route
        const {
            params: { id }
        } = route;

        // if the pokemon is a favorite, remove it from the favorites
        if (favorite) {
            removeFavorite(id);
            setFavorite(false);
        }
        // otherwise, add it to the favorites
        else {
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

export default AddRemoveFavoriteButton;
