import { getTodos } from "@/api/todo";
import { useAuth } from "./_layout";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from "react-native";

export default function TodoScreen() {
  const { token } = useAuth();

  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    let active = true;

    const loadTodos = async () => {
      try {
        const data = await getTodos(token);

        if (active) {
          setTodos(
            Array.isArray(data) ? data : data.todos ?? []
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadTodos();

    return () => {
      active = false;
    };
  }, [token]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Text>{item.todo}</Text>
        </View>
      )}
    />
  );
}