import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import cardStyles from "./cardStyles";

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: "#cbd5e0",
        borderRadius: 15,
        marginHorizontal: 30,
        marginBottom: 15,
        padding: 30
    }
});

export default function PreviewCard({ name, id, image, navigation }) {
    return (
        <TouchableHighlight
            onPress={() => navigation.navigate("Info", { name, id, image })}
            underlayColor="white">
            <View style={styles.card}>
                {image ? (
                    <View style={cardStyles.image}>
                        <Image
                            source={{
                                uri: image,
                                width: 200,
                                height: 200
                            }}
                            style={{ alignSelf: "center" }}
                        />
                    </View>
                ) : (
                    <Text>No image available.</Text>
                )}
                <Text style={cardStyles.title}>{name}</Text>
            </View>
        </TouchableHighlight>
    );
}
