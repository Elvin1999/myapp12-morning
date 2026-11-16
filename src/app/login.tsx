import { loginuser } from "@/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (token) {
          router.replace("/");
          return;
        }
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    checkToken();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await loginuser(username, password);

      if (res.accessToken) {
        await AsyncStorage.setItem("token", res.accessToken);

        router.replace("/");
      } else {
        Alert.alert("Error", "Invalid credentials!");
      }
    } catch (error) {
      Alert.alert("Error", "There is a problem in login!");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Username</Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Enter username"
      />

      <Text>Password</Text>

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />

      <Button title="Sign In" onPress={handleLogin} />
    </View>
  );
}