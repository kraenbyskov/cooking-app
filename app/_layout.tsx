import AsyncStorage from "@react-native-async-storage/async-storage"
import { Stack } from "expo-router/stack"
import { initializeApp } from "firebase/app"
import { getReactNativePersistence, initializeAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { AppRegistry } from "react-native"
import { PaperProvider, MD3LightTheme as DefaultTheme, Button } from "react-native-paper"
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "tomato",
        secondary: "yellow",
    },
}

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
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
