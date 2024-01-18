import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { getData, storeData } from "../../lib/getData";
import Button from "../../components/Button";
import BaseModal from "../../components/BaseModal";

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
  const [selectedTodo, setSelectedTodo] = useState<TodoItem>();
  const [modalVisible, setModalVisible] = useState<"add" | "delete" | "none">(
    "none"
  );
  const [inputText, setInputText] = useState("");

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

  const deleteTodo = (id: string) => {
    setTodos((todos) => todos.filter((item) => id !== item.id));
  };

  const toggleItemDone = (id: string) => {
    setTodos((todos) =>
      todos.map((item) =>
        item.id === id ? { ...item, isComplete: !item.isComplete } : item
      )
    );
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<TodoItem>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={drag}
          onPress={() => toggleItemDone(item.id)}
          disabled={isActive}
          style={[
            styles.itemWrapper,
            { backgroundColor: isActive ? "#004d83" : "#003459" },
          ]}
        >
          <Text style={styles.itemText}>{item.label}</Text>
          {item.isComplete ? (
            <MaterialIcons name="check-box" size={24} color="white" />
          ) : (
            <MaterialIcons
              name="check-box-outline-blank"
              size={24}
              color="white"
            />
          )}
          <FontAwesome
            name="trash-o"
            size={24}
            color="white"
            style={{ marginLeft: 10 }}
            onPress={() => {
              setSelectedTodo(item);
              setModalVisible("delete");
            }}
          />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <View style={styles.pageWrapper}>
      <DraggableFlatList
        data={todos}
        onDragEnd={({ data }) => setTodos(data)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <View>
        <View style={{ marginBottom: 10 }}>
          <Button label="Add Todo" onPress={() => setModalVisible("add")} />
        </View>
        <Button label="Save Todos" onPress={() => storeData(todos)} />
      </View>
      <BaseModal
        isVisible={modalVisible === "add"}
        onClose={() => setModalVisible("none")}
        label="Add todo"
      >
        <TextInput
          style={styles.input}
          onChangeText={setInputText}
          value={inputText}
        />
        <Button
          label="Add Todo"
          onPress={() => {
            addTodo({
              id: uuidv4(),
              label: inputText,
              isComplete: false,
              position: todos.length + 1,
            });
            setModalVisible("none");
          }}
        />
      </BaseModal>

      <BaseModal
        isVisible={modalVisible === "delete"}
        onClose={() => setModalVisible("none")}
        label="Delete todo"
      >
        <Text
          style={{
            paddingHorizontal: 30,
            paddingVertical: 20,
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Are you sure you want to delete this item?
        </Text>
        <Button
          label="Delete Todo"
          onPress={() => {
            if (selectedTodo) {
              deleteTodo(selectedTodo?.id);
            }
            setModalVisible("none");
          }}
        />
      </BaseModal>
    </View>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#a3c4bc",
    paddingVertical: 20,
  },
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  itemText: {
    color: "white",
    fontWeight: "bold",
    marginRight: "auto",
  },
  input: {
    color: "white",
    padding: 20,
    fontSize: 16,
    backgroundColor: "#8993a0",
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
