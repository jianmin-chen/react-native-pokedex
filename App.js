import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity } from "react-native";
import Home from "./screens/Home";
import Info from "./screens/Info";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => console.log("TODO")}
                                style={{ marginRight: 15 }}>
                                <Text
                                    style={{ color: "#0099ff", fontSize: 17 }}>
                                    My Pokemon
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
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
                                    style={{ color: "#0099ff", fontSize: 17 }}>
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
