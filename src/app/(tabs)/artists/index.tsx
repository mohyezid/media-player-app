import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native'

import { defaultStyles, utilsStyles } from '@/styles'
import { Link, useNavigation } from 'expo-router'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useArtists } from '@/store/queue'
import { artistNameFilter, trackTitleFilter } from '@/helpers/filter'
import { useMemo } from 'react'
import { screenPadding } from '@/constants/token'
import FastImage from 'react-native-fast-image'
import { unknownArtistImageUri } from '@/constants/Images'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ArtistsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Search for artists',
		},
	})
	const ItemSeparetor = () => (
		<View style={{ ...utilsStyles.itemSeparator, marginVertical: 12, marginLeft: 50 }}></View>
	)
	const artist = useArtists()

	const filteredArtist = useMemo(() => {
		if (!search) return artist
		return artist.filter(artistNameFilter(search))
	}, [])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<FlatList
					contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
					data={filteredArtist}
					scrollEnabled={false}
					ItemSeparatorComponent={ItemSeparetor}
					ListFooterComponent={ItemSeparetor}
					ListEmptyComponent={
						<View>
							<Text>No Artist Found</Text>
							<FastImage
								source={{ uri: unknownArtistImageUri, priority: FastImage.priority.normal }}
								style={utilsStyles.emptyContentImage}
							/>
						</View>
					}
					renderItem={({ item: artists }) => {
						return (
							<Link href={`/artists/${artists.name}`} asChild>
								<TouchableOpacity activeOpacity={0.8}>
									<View style={styles.artistItemContainer}>
										<View>
											<FastImage
												source={{ uri: unknownArtistImageUri, priority: FastImage.priority.normal }}
												style={styles.artistImage}
											/>
										</View>
										<View style={{ width: '100%' }}>
											<Text numberOfLines={1} style={styles.artistNameText}>
												{artists.name}
											</Text>
										</View>
									</View>
								</TouchableOpacity>
							</Link>
						)
					}}
				/>
			</ScrollView>
		</View>
	)
}
const styles = StyleSheet.create({
	artistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
	},
	artistImage: {
		borderRadius: 32,
		width: 40,
		height: 40,
	},
	artistNameText: {
		...defaultStyles.text,
		fontSize: 17,
		maxWidth: '80%',
	},
})
export default ArtistsScreen
