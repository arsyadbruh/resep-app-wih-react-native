import React from "react";
import { Center, Text } from "native-base";
import { Header } from "../components";

const AboutScreen = () => {
  return (
    <>
      <Header title="About" withLogo={true} />
      <Center flex={1}>
        <Text fontSize="xl">About Screen</Text>
      </Center>
    </>
  );
};

export default AboutScreen;
