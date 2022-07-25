import { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";

const COLORS = {
    error: "#E53E3E",
    success: "#38A169",
};

const styles = StyleSheet.create({
    alert: {
        borderRadius: 15,
        color: "white",
        fontSize: 16,
        fontWeight: "700",
        padding: 15,
    },
});

export default function Alert({ kind, content }) {
    return (
        <View style={{ marginBottom: 15 }}>
            <Text style={[styles.alert, { backgroundColor: COLORS[kind] }]}>
                {content}
            </Text>
        </View>
    );
}
