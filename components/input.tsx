import React, { memo } from "react"
import { View, StyleSheet, Text } from "react-native"
import { TextInput as PaperTextInput, TextInputProps, useTheme } from "react-native-paper"
import styled from "styled-components/native"

// Extend the props to include react-native-paper TextInput props and your custom props
interface CustomTextInputProps extends TextInputProps {
    errorText?: string
    backgroundColor?: string
}

const StyledError = styled(Text)<{ errorColor?: string }>`
    font-size: 14px;
    color: ${(props) => props.errorColor || "#5067FF"};
    padding-horizontal: 4px;
    padding-top: 4px;
`

const TextInput = ({ errorText, backgroundColor, style, ...props }: CustomTextInputProps) => {
    const theme = useTheme()

    return (
        <View style={styles.container}>
            <PaperTextInput
                theme={{ colors: { primary: theme.colors.primary } }}
                underlineColor="transparent"
                mode="flat"
                style={[{ backgroundColor: backgroundColor || theme.colors.surface }, style]}
                {...props}
            />
            {errorText ? <StyledError errorColor={theme.colors.error}>{errorText}</StyledError> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: 25,
    },
})

export default memo(TextInput)
