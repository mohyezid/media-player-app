import { View, Text, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { defaultStyles } from '@/styles'
import TrackList from '@/app/components/TrackList'
import { screenPadding } from '@/constants/token'
import { useNavigation } from 'expo-router'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import library from '@/assets/data/library.json'
import { trackTitleFilter } from '@/helpers/filter'
import { useTracks } from '@/store/library'
import { generateTracksListId } from '@/helpers/miscellaneous'
const SongsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: { placeholder: 'Find in Songs' },
	})
	const tracks = useTracks()

	const filteredSongs = useMemo(() => {
		if (!search) return tracks

		return tracks.filter(trackTitleFilter(search))
	}, [search])
	console.log(search)
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<TrackList
					tracks={filteredSongs}
					hideQueueControls={true}
					scrollEnabled={false}
					id={generateTracksListId('songs', search)}
				/>
			</ScrollView>
		</View>
	)
}

export default SongsScreen
