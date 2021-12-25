import React from "react";
import { Center, Text } from "native-base";
import { Header } from "../components";

const RecipeDetailScreen = () => {
  return (
    <>
      <Header title="Recipe Detail" withBackBtn={true} />
      <Center flex={1}>
        <Text fontSize="xl">Recipe Detail Screen</Text>
      </Center>
    </>
  );
};

export default RecipeDetailScreen;
