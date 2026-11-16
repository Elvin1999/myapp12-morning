import { loginuser } from "@/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("emilys"),
    [password, setPassword] = useState("emilyspass");

  const handleLogin = async () => {
    try {
      const res = await loginuser(username, password);
      if (res.accessToken) {
        await AsyncStorage.setItem("token", res.accessToken);
        router.replace("/");
      }
    } catch (err) {
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
      />

      <Button title="Sign In" onPress={handleLogin} />
    </View>
  );
}
