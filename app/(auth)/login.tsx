import { router } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { signInWithEmailAndPassword, getAuth } from "firebase/auth"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { TextInput, Button } from "react-native-paper"

export const emailValidator = (email: string) => {
    const re = /\S+@\S+\.\S+/

    if (!email || email.length <= 0) return "Email cannot be empty."
    if (!re.test(email)) return "Ooops! We need a valid email address."

    return ""
}

export const passwordValidator = (password: string) => {
    if (!password || password.length <= 0) return "Password cannot be empty."

    return ""
}

export const nameValidator = (name: string) => {
    if (!name || name.length <= 0) return "Name cannot be empty."

    return ""
}

export default function Index() {
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
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
})
