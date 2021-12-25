import React from "react";
import { Button, Center, Text } from "native-base";
import { Header } from "../components";

const RecipeScreen = ({ navigation }) => {
  return (
    <>
      <Header title="Recipes" withLogo={true} />
      <Center flex={1}>
        <Text fontSize="xl" marginBottom={5}>
          Recipe Screen
        </Text>
        <Button
          size="lg"
          colorScheme="light"
          rounded="full"
          onPress={() => navigation.navigate("RecipeDetail")}
        >
          Go to Recipe Detail
        </Button>
      </Center>
    </>
  );
};

export default RecipeScreen;
