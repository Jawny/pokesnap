import React from "react";
import { SafeAreaView, Text } from "react-native";
import {
  Background,
  Button,
  Paragraph,
  Header,
  Logo,
  CameraButton,
} from "components";

export default function Dashboard({ navigation }: any) {
  return (
    <SafeAreaView>
      {/* <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "StartScreen" }],
          })
        }
      >
        Logout
      </Button> */}
      <Text>hihihi</Text>
      <CameraButton />
    </SafeAreaView>
  );
}
