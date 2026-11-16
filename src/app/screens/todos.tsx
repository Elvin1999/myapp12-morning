import { getTodos } from "@/api/todo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function TodoScreen() {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const token: string = (await AsyncStorage.getItem("token")) ?? "";
      const data = await getTodos(token);
      setTodos(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <ActivityIndicator />;

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
