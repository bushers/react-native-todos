import { Tabs } from "expo-router";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <FontAwesome5 name="home" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="todos"
        options={{
          title: "Todos",
          tabBarIcon: () => <AntDesign name="bars" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
