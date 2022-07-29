import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity } from "react-native";
import Home from "./screens/Home";
import Info from "./screens/Info";

import AddRemoveFavoriteButton from "./components/AddRemoveFavoriteButton";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={({ navigation }) => ({
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Favorites")}
                                style={{ marginRight: 15 }}>
                                <Text
                                    style={{ color: "#0099ff", fontSize: 17 }}>
                                    My Pokemon
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                />
                <Stack.Screen
                    name="Info"
                    component={Info}
                    options={{ headerRight: () => <AddRemoveFavoriteButton /> }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
