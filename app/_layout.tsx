import AsyncStorage from "@react-native-async-storage/async-storage"
import { Stack } from "expo-router/stack"
import { initializeApp } from "firebase/app"
import { getReactNativePersistence, initializeAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import React from "react"
import { AppRegistry } from "react-native"
import { PaperProvider } from "react-native-paper"

import "../core/i18n"
import { theme } from "../core/theme"

export { ErrorBoundary } from "expo-router"

export const unstable_settings = {
    initialRouteName: "(tabs)",
}

const firebaseConfig = {
    apiKey: "AIzaSyD3LazlxdCrVt3qIuc7qxa7j0MTFvo-mjM",
    authDomain: "myfoodplanner-7f63b.firebaseapp.com",
    projectId: "myfoodplanner-7f63b",
    storageBucket: "myfoodplanner-7f63b.appspot.com",
    messagingSenderId: "986565033593",
    appId: "1:986565033593:web:215e0d9c0cae0a5e0d5ea8",
}

const app = initializeApp(firebaseConfig)

initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
})

export const db = getFirestore(app)

export default function AppLayout() {
    return (
        <PaperProvider theme={theme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false, animation: "none" }} />
            </Stack>
        </PaperProvider>
    )
}

AppRegistry.registerComponent("myFoodPlanner", () => AppLayout)
