import { View, Text, ScrollView } from "react-native";
import React, { useMemo } from "react";
import { defaultStyles } from "@/styles";
import TrackList from "@/app/components/TrackList";
import { screenPadding } from "@/constants/token";
import { useNavigation } from "expo-router";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import library from "@/assets/data/library.json";
import { trackTitleFilter } from "@/helpers/filter";
const SongsScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: { placeholder: "Find in Songs" },
  });

  const filteredSongs = useMemo(() => {
    if (!search) return library;
    return library.filter((song) => song.title.toLowerCase().includes(search));
  }, [search]);
  console.log(search);
  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <TrackList tracks={filteredSongs} scrollEnabled={false} />
      </ScrollView>
    </View>
  );
};

export default SongsScreen;
