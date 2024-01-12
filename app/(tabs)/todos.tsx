import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { getData, storeData } from "../../lib/getData";
import { FlatList } from "react-native-gesture-handler";
import Button from "../../components/Button";

export interface TodoItem {
  id: string;
  label: string;
  isComplete: boolean;
  position: number;
}

const dummyTodos: Array<TodoItem> = [
  { id: "todo1", label: "Clean kitchen", isComplete: false, position: 1 },
  { id: "todo2", label: "Shop for groceries", isComplete: false, position: 2 },
  { id: "todo3", label: "Make coffee", isComplete: true, position: 3 },
];

export default function Todos() {
  const [todos, setTodos] = useState<Array<TodoItem>>([]);

  useEffect(() => {
    getData()
      .then((val) => {
        if (val && val.length > 0) {
          console.log("Todos found in storage ", val);
          setTodos(val);
        } else {
          console.log("No Todos found in storage");
          setTodos([]);
        }
      })
      .catch((e: Error) => {
        console.log(`There was an error fetching Todos: ${e.message}`);
      });
  }, []);

  const addTodo = (todo: TodoItem) => {
    setTodos((todos) => [...todos, todo]);
  };

  return (
    <View style={styles.pageWrapper}>
      <Text>Todos Page</Text>
      <FlatList
        data={todos}
        renderItem={({ item }) => {
          return (
            <View key={item.id} style={styles.itemWrapper}>
              <Text>{item.label}</Text>
              <Text>{`${item.isComplete}`}</Text>
            </View>
          );
        }}
      />

      <Button label="Save Todos" onPress={() => storeData(todos)} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
