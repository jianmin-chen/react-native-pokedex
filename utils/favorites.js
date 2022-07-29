// import async storage library
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "favorites";

// export function to get all favorites
export async function getFavorites() {
    let favorites = await AsyncStorage.getItem(FAVORITES_KEY);

    // if favorites is null, set favorites to an empty array
    if (!favorites) {
        favorites = [];
    }
    // otherwise, parse the favorites
    else {
        favorites = JSON.parse(favorites);
    }

    return favorites;
}

// export function to add a favorite
export async function addFavorite(favoriteID) {
    // get current favorites
    let favorites = await getFavorites();

    // add the favorite to the favorites array if it doesn't already exist
    if (!favorites.includes(favoriteID)) {
        favorites.push(favoriteID);
        // return the favorites array
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
}

// export function to remove a favorite
export async function removeFavorite(favoriteID) {
    // get current favorites
    let favorites = await getFavorites();

    // remove the favorite from the favorites array
    favorites = favorites.filter(id => id !== favoriteID);

    // return the favorites array
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export async function isFavorite(favoriteID) {
    // get current favorites
    let favorites = await getFavorites();

    // return true if the favoriteID is in the favorites array
    return favorites.includes(favoriteID);
}
