import unknown_artist from "@/assets/unknown_artist.png";
import unknown_track from "@/assets/unknown_track.png";
import { Image } from "react-native";

export const unknownTrackImageUri = Image.resolveAssetSource(unknown_track).uri;
export const unknownArtistImageUri =
  Image.resolveAssetSource(unknown_artist).uri;
