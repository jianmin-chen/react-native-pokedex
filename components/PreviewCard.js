import { Image, View, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: "#cbd5e0",
        borderRadius: 15,
        marginBottom: 15,
        padding: 30,
        // transform: [{ rotate: "2deg" }],
    },
    h1: {
        fontSize: 36,
        fontWeight: "800",
        marginVertical: 20,
        textAlign: "center",
    },
    badge: {
        borderRadius: 5,
        color: "white",
        fontSize: 12,
        fontWeight: "800",
        marginBottom: 10,
        padding: 8,
    },
});

function Type({ kind }) {
    const colors = {
        fighting: "#d56723",
        grass: "#9bcc50",
        poison: "#b97fc9",
    };

    return (
        <View
            style={[styles.badge, { backgroundColor: colors[kind], flex: 1 }]}
        >
            <Text style={{ textTransform: "capitalize" }}>{kind}</Text>
        </View>
    );
}

export default function PreviewCard({ name, image, id }) {
    return (
        <View style={styles.card}>
            {image ? (
                <View
                    style={{
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: "#cbd5e0",
                        padding: 30,
                    }}
                >
                    <Image
                        source={{
                            uri: image,
                            width: 200,
                            height: 200,
                        }}
                        style={{ alignSelf: "center" }}
                    />
                </View>
            ) : (
                <Text>No image available.</Text>
            )}
            <Text style={[styles.h1, { textTransform: "capitalize" }]}>
                {name}
            </Text>
        </View>
    );
}
