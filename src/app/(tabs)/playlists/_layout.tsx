import { View, Text } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { StackScreenWithSearchBar } from '@/constants/layout'
import { colors } from '@/constants/token'
const PlayListsScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						...StackScreenWithSearchBar,
						headerTitle: 'playList',
					}}
				/>
				<Stack.Screen
					name="[name]"
					options={{
						headerBackVisible: true,
						headerStyle: {
							backgroundColor: colors.background,
						},
						headerTintColor: colors.primary,

						headerTitle: '',
					}}
				/>
			</Stack>
		</View>
	)
}

export default PlayListsScreenLayout
