import { View, Text } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { StackScreenWithSearchBar } from '@/constants/layout'
import { colors } from '@/constants/token'
const SongsScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						...StackScreenWithSearchBar,

						headerTitle: 'Artist',
					}}
				/>
				<Stack.Screen
					name="[name]"
					options={{
						headerBackVisible: true,
						headerStyle: {
							backgroundColor: colors.background,
						},
						headerTintColor: colors.text,
						headerTitle: '',
					}}
				/>
			</Stack>
		</View>
	)
}

export default SongsScreenLayout
