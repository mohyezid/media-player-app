import { create } from 'zustand'
import { useLibraryStore } from './library'
import { Artist, Playlist } from '@/helpers/types'
import { unknownTrackImageUri } from '@/constants/Images'

type QueueStore = {
	activeQueueId: string | null
	setActiveQueueId: (id: string) => void
}
export const useQueueStore = create<QueueStore>()((set) => ({
	activeQueueId: null,
	setActiveQueueId: (id) => set({ activeQueueId: id }),
}))

export const useQueue = () => useQueueStore((state) => state)

export const useArtists = () =>
	useLibraryStore((state) => {
		return state.tracks.reduce((acc, track) => {
			const existingArtist = acc.find((artist) => artist.name === track.artist)
			if (existingArtist) {
				existingArtist.tracks.push(track)
			} else {
				acc.push({
					name: track.artist ?? 'Unknown',
					tracks: [track],
				})
			}

			return acc
		}, [] as Artist[])
	})

export const usePlayLists = () => {
	const playLists = useLibraryStore((state) => {
		return state.tracks.reduce((acc, track) => {
			track?.playlist?.forEach((playlists) => {
				const existingPlaylist = acc.find((playlist) => playlist.name === playlists)
				if (existingPlaylist) {
					existingPlaylist.tracks.push(track)
				} else {
					acc.push({
						artworkPreview: track.artwork ?? unknownTrackImageUri,
						name: playlists,
						tracks: [track],
					})
				}
			})
			return acc
		}, [] as Playlist[])
	})

	const addToPlaylist = useLibraryStore((state) => state.addToPlaylist)
	return { playLists, addToPlaylist }
}
