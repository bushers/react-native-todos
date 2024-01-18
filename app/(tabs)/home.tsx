import { Text, View, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.homeWrapper}>
      <Link style={styles.link} href="/todos">
        <View>
          <Text style={styles.title}>Todo List</Text>
          <Octicons
            style={{ textAlign: "center" }}
            name="checklist"
            size={80}
            color="black"
          />
        </View>
      </Link>
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
  link: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 38,
    marginBottom: 20,
  },
});
