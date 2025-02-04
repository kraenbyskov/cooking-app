import { router } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { TextInput, Button } from "react-native-paper"

import { nameValidator, emailValidator, passwordValidator } from "../../core/utils"
import { db } from "../_layout"

export default function Index() {
    const [name, setName] = useState({ value: "", error: "" })
    const [email, setEmail] = useState({ value: "", error: "" })
    const [password, setPassword] = useState({ value: "", error: "" })
    const _onSignUpPressed = async () => {
        const nameError = nameValidator(name.value)
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)

        if (emailError || passwordError || nameError) {
            setName({ ...name, error: nameError })
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }

        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
            .then(async (user) => {
                await setDoc(doc(db, "users", user.user.uid), {
                    name: name.value,
                    email: email.value,
                })
                if (user) router.replace("/(tabs)")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <View style={styles.container}>
            <Text>Register</Text>
            <View
                style={{
                    width: "100%",
                    marginVertical: 25,
                    paddingHorizontal: 20,
                }}
            >
                <TextInput
                    label="Name"
                    returnKeyType="next"
                    value={name.value}
                    onChangeText={(text) => setName({ value: text, error: "" })}
                    error={!!name.error}
                />

                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text) => setEmail({ value: text, error: "" })}
                    error={!!email.error}
                    autoCapitalize="none"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />

                <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: "" })}
                    error={!!password.error}
                    secureTextEntry
                />
            </View>

            <Button mode="contained" onPress={_onSignUpPressed}>
                Login
            </Button>
            <StatusBar style="auto" />
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
