import React from "react";
import { View, KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native-paper";
import { styles } from "./LoginPageStyles";

export const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <TextInput
          style={styles.TextInput}
          label="Email"
          value={email}
          onChange={(email: any) => setEmail(email)}
        />
        <TextInput
          style={styles.TextInput}
          label="Password"
          value={password}
          onChange={(password: any) => setPassword(password)}
          secureTextEntry
        />
      </View>
    </KeyboardAvoidingView>
  );
};
