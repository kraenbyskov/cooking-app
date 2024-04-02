import { router } from "expo-router"
import { Stack } from "expo-router/stack"
import { getAuth } from "firebase/auth"
import React from "react"

export default function TabLayout() {
    getAuth().onAuthStateChanged((user) => {
        if (user) {
            if (user) router.replace("/(tabs)")
        }
    })

    return (
        <Stack>
            <Stack.Screen
                name="login"
                options={{
                    title: "login",
                }}
            />
            <Stack.Screen
                name="Register"
                options={{
                    title: "Register",
                }}
            />
        </Stack>
    )
}
