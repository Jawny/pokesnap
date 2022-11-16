import React from "react";
import { Background, Button, Header, Logo, Paragraph } from "components";

export default function StartScreen({ navigation }: any) {
  return (
    <Background>
      <Logo />
      <Header>Login Template</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Sign Up
      </Button>
    </Background>
  );
}
