import { Text, View, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";

export default function Home() {
  return (
    <View style={styles.homeWrapper}>
      <Text style={styles.title}>Todo List</Text>
      <Octicons name="checklist" size={80} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a3c4bc",
  },
  title: {
    fontSize: 38,
    marginBottom: 20,
  },
});
