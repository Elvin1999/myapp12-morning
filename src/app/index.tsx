import { getTodos } from "@/api/todo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  View,
} from "react-native";

export default function TodoScreen() {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokenAndLoadTodos = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        // Token yoxdursa Login ekranına keç
        if (!token) {
          router.replace("/login");
          return;
        }

        // Token varsa Todos məlumatlarını gətir
        const data = await getTodos(token);

        setTodos(Array.isArray(data) ? data : data.todos ?? []);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkTokenAndLoadTodos();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("token");

    router.replace("/login");
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Todos Screen",
          headerRight: () => (
            <Button
              title="Log Out"
              onPress={logout}
            />
          ),
        }}
      />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.todo}</Text>
          </View>
        )}
      />
    </>
  );
}