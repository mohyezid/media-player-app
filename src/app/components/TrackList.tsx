import { View, Text, FlatList, FlatListProps } from 'react-native'
import React from 'react'
import library from '@/assets/data/library.json'
import TrackListItem, { TrackListItemProps } from './TrackListItem'
import { utilsStyles } from '@/styles/index'
import TrackPlayer, { Track } from 'react-native-track-player'
import FastImage from 'react-native-fast-image'
import { unknownArtistImageUri, unknownTrackImageUri } from '@/constants/Images'
import { colors } from '@/constants/token'
export type TrackListProps = Partial<FlatListProps<Track>> & {
	tracks: Track[]
}
const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}></View>
)
const TrackList = ({ tracks, ...flatlistProps }: TrackListProps) => {
	const handleTrackSelect = async (track: Track) => {
		await TrackPlayer.load(track)
		await TrackPlayer.play()
	}

	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListFooterComponent={ItemDivider}
			ItemSeparatorComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Text style={{ ...utilsStyles.emptyContentText }}>No Songs found</Text>

					<FastImage
						source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
						style={utilsStyles.emptyContentImage}
					/>
				</View>
			}
			renderItem={({ item: track }) => (
				<TrackListItem track={track} onTrackSelect={handleTrackSelect} />
			)}
			{...flatlistProps}
		/>
	)
}

export default TrackList
