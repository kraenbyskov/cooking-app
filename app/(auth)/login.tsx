import { router } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { signInWithEmailAndPassword, getAuth } from "firebase/auth"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-paper"

import TextInput from "../../components/input"
import { emailValidator, passwordValidator } from "../../core/utils"

export default function Login() {
    const [email, setEmail] = useState({ value: "", error: "" })
    const [password, setPassword] = useState({ value: "", error: "" })
    const [loginError, setloginError] = useState("")

    const _onLoginPressed = () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }

        signInWithEmailAndPassword(getAuth(), email.value, password.value)
            .then((user) => {
                if (user) router.replace("/(tabs)")
            })
            .catch((error) => {
                setloginError(error.code)
            })
    }

    return (
        <View style={styles.container}>
            <Text>Login user</Text>
            <View
                style={{
                    width: "100%",
                    marginVertical: 25,
                    paddingHorizontal: 20,
                }}
            >
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

            {loginError ? (
                <Text>
                    {loginError === "auth/user-not-found"
                        ? "Forkert Email"
                        : loginError === "auth/wrong-password"
                          ? "Forkert Password"
                          : loginError === "auth/too-many-requests"
                            ? "Glemt dit password ? "
                            : loginError}
                </Text>
            ) : null}
            <Button mode="contained" onPress={_onLoginPressed}>
                Login
            </Button>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
})
