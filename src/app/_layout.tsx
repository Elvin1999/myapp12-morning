import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Button } from "react-native";
import { router, Stack } from "expo-router";

export default function App() {
  const [token, setToken] = useState<string | null>(null),
    [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const savedToken = await AsyncStorage.getItem("token");
      setToken(savedToken);
      setLoading(false);
    })();
  }, []);

  if (loading) return <ActivityIndicator />;

  return (
    <Stack>
      <Stack.Protected guard={!!token}>
        <Stack.Screen
          name="todos"
          options={{
            title: "Todos Screen",
            headerRight: () => {
              <Button
                title="Log Out"
                onPress={async () => {
                  await AsyncStorage.removeItem("token");
                  router.replace("/login");
                }}
              />;
            },
          }}
        />
      </Stack.Protected>

      <Stack.Protected guard={!token}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
