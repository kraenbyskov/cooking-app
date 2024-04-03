import { StatusBar } from "expo-status-bar"
import { useTranslation } from "react-i18next"
import { StyleSheet, Text, View } from "react-native"

export default function Index() {
    const { t } = useTranslation()
    return (
        <View style={styles.container}>
            <Text>{t("welcome")}</Text>
            <Text>{t("description")}</Text>

            <StatusBar style="dark" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
})
