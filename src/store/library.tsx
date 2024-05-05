import { TrackWithPlaylist } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import library from '@/assets/data/library.json'
import { create } from 'zustand'
interface LibraryState {
	tracks: TrackWithPlaylist[]
	toggleTrackFavorite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
	tracks: library,
	toggleTrackFavorite: (track) =>
		set((state) => ({
			tracks: state.tracks.map((ct) => {
				if (ct.url === track.url) {
					return {
						...ct,
						rating: ct.rating === 1 ? 0 : 1,
					}
				}
				return ct
			}),
		})),
	addToPlaylist: (track, playlistName) =>
		set((state) => ({
			tracks: state.tracks.map((ct) => {
				if (ct.url === track.url) {
					return {
						...ct,
						playlist: [...(ct.playlist ?? []), playlistName],
					}
				}
				return ct
			}),
		})),
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavorites = () => {
	const favorites = useLibraryStore((state) => state.tracks.filter((track) => track.rating === 1))

	const toggleFav = useLibraryStore((state) => state.toggleTrackFavorite)
	return {
		favorites,
		toggleFav,
	}
}
