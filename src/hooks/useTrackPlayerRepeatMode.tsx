import { useCallback, useEffect, useState } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

export const useTrackPlayerRepeatMode = () => {
	const [repeat, setRepeat] = useState<RepeatMode>()

	const changeRepeatMode = useCallback(async (repeatMode: RepeatMode) => {
		await TrackPlayer.setRepeatMode(repeatMode)
		setRepeat(repeatMode)
	}, [])
	useEffect(() => {
		TrackPlayer.getRepeatMode().then(setRepeat)
	}, [])

	return { repeat, changeRepeatMode }
}
