import React from "react";
import { Background, Button, Header, Logo, Paragraph } from "components";

export default function StartScreen({ navigation }: any) {
  return (
    <Background>
      <Logo />
      <Header>Pokedex</Header>
      <Paragraph>Find and Document the Original 151 Pokemon!</Paragraph>
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
