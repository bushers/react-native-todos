import { Text, View, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.homeWrapper}>
      <Text>Home Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
});
