import React from "react";
import { View, KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native-paper";

export const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <KeyboardAvoidingView>
      <View>
        <TextInput
          label="Email"
          value={email}
          onChange={(email: any) => setEmail(email)}
        />
        <TextInput
          outlined
          label="Password"
          value={password}
          onChange={(password: any) => setPassword(password)}
          secureTextEntry
        />
      </View>
    </KeyboardAvoidingView>
  );
};
