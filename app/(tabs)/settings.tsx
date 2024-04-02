import { StatusBar } from "expo-status-bar"
import { getAuth, signOut } from "firebase/auth"
import { StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-paper"

export default function Index() {
    const { currentUser } = getAuth()
    return (
        <View style={styles.container}>
            <Text>Settings</Text>
            <Text style={styles.title}>{currentUser?.email}</Text>
            <Button onPress={() => signOut(getAuth())}>Sign out</Button>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
})
