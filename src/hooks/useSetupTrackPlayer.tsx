import { useEffect, useRef } from 'react'
import TrackPlayer, {
	AppKilledPlaybackBehavior,
	Capability,
	RatingType,
	RepeatMode,
} from 'react-native-track-player'

const setupPlayer = async () => {
	await TrackPlayer.setupPlayer({
		maxCacheSize: 1024 * 10,
	})
	TrackPlayer.updateOptions({
		ratingType: RatingType.Heart,
		capabilities: [
			Capability.Play,
			Capability.Pause,
			Capability.SkipToNext,
			Capability.SkipToPrevious,
			Capability.Stop,
		],
		android: {
			// This is the default behavior
			appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
		},
	})
	// await TrackPlayer.updateOptions({
	// 	ratingType: RatingType.Heart,
	// 	capabilities: [
	// 		Capability.Play,
	// 		Capability.Pause,
	// 		Capability.SkipToNext,
	// 		Capability.SkipToPrevious,
	// 		Capability.Stop,
	// 	],
	// })

	await TrackPlayer.setVolume(0.3) // not too loud
	await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
	const isInitialized = useRef(false)

	useEffect(() => {
		if (isInitialized.current) return

		setupPlayer()
			.then(() => {
				isInitialized.current = true
				onLoad?.()
			})
			.catch((error) => {
				isInitialized.current = false
				console.error(error)
			})
	}, [onLoad])
}
