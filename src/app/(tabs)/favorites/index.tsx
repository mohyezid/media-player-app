import { View, Text, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { defaultStyles } from '@/styles'
import TrackList from '@/app/components/TrackList'
import library from '@/assets/data/library.json'
import { screenPadding } from '@/constants/token'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useFavorites } from '@/store/library'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
const SongsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find songs',
		},
	})
	const favlist = useFavorites().favorites
	const filteredFavTracks = useMemo(() => {
		if (!search) return favlist
		return favlist.filter(trackTitleFilter(search))
	}, [search, favlist])
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<TrackList
					tracks={filteredFavTracks}
					scrollEnabled={false}
					id={generateTracksListId('favorites', search)}
				/>
			</ScrollView>
		</View>
	)
}

export default SongsScreen
