import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity } from "react-native";
import Home from "./screens/Home";
import Info from "./screens/Info";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={({ navigation }) => ({
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => console.log("TODO")}
                                style={{ marginRight: 15 }}>
                                <Text
                                    style={{
                                        color: "#007aff",
                                        fontSize: 17,
                                        letterSpacing: 0.35
                                    }}>
                                    My Pokemon
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                />
                <Stack.Screen
                    name="Info"
                    component={Info}
                    options={{
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => console.log("TODO")}
                                style={{ marginRight: 15 }}>
                                <Text
                                    style={{
                                        color: "#007aff",
                                        fontSize: 17,
                                        letterSpacing: 0.35
                                    }}>
                                    Add
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
