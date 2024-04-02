import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs, router } from "expo-router"
import { getAuth } from "firebase/auth"
import React, { useState } from "react"
import { View, Text } from "react-native"

export default function TabLayout() {
    const [isLoading, setIsLoading] = useState(true)

    getAuth().onAuthStateChanged((user) => {
        setIsLoading(false)
        if (!user) {
            router.replace("/(auth)/login")
        }
    })

    if (isLoading)
        return (
            <View>
                <Text style={{ paddingTop: 30 }}>Loading...</Text>
            </View>
        )

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
        </Tabs>
    )
}
