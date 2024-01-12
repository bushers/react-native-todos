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
    height: 300,
    width: 300,
    backgroundColor: "green",
  },
});
