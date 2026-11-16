import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button } from "react-native";

type AuthType = {
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext not found");
  }

  return context;
}

export default function RootLayout() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
        setToken(savedToken);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  const login = async (newToken: string) => {
    await AsyncStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      <Stack>
        <Stack.Protected guard={!!token}>
          <Stack.Screen
            name="index"
            options={{
              title: "Todos Screen",
              headerRight: () => (
                <Button title="Log Out" onPress={logout} />
              ),
            }}
          />
        </Stack.Protected>

        <Stack.Protected guard={!token}>
          <Stack.Screen
            name="login"
            options={{ headerShown: false }}
          />
        </Stack.Protected>
      </Stack>
    </AuthContext.Provider>
  );
}