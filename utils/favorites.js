import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "favorites";

export async function getFavorites() {
    // Get all favorites
    let favorites = await AsyncStorage.getItem(FAVORITES_KEY);

    if (!favorites)
        favorites = []; // If favorites is null, set favorites to an empty array
    else favorites = JSON.parse(favorites);

    return favorites;
}

export async function addFavorite(favoriteID) {
    // Add a favorite
    let favorites = await getFavorites();

    if (!favorites.includes(favoriteID)) {
        // Add the favorite to the favorites array if it doesn't already exist
        favorites.push(favoriteID);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
}

export async function removeFavorite(favoriteID) {
    // Get current favorites
    let favorites = await getFavorites();
    favorites = favorites.filter(id => id !== favoriteID);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export async function isFavorite(favoriteID) {
    // Determine if a Pokemon is already in favorites
    let favorites = await getFavorites();
    return favorites.includes(favoriteID);
}
