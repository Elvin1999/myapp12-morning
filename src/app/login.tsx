import { loginuser } from "@/api/auth";
import { useAuth } from "./_layout";
import { useState } from "react";

import {
  Alert,
  Button,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const { login } = useAuth();

  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  const handleLogin = async () => {
    try {
      const res = await loginuser(username, password);

      if (res.accessToken) {
        await login(res.accessToken);
      } else {
        Alert.alert("Error", "Invalid credentials!");
      }
    } catch (error) {
      Alert.alert("Error", "There is a problem in login!");
    }
  };

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