import React, {useEffect, useState} from "react";
import { Center, HStack, ScrollView, Text, Box, Image, AspectRatio, Heading, Spinner, FlatList, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { Header } from "../components";



const RecipeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isFetching, setFetching] = useState(false);

  const getResepData = async () => {
    try {
      const response = await fetch(
        "https://masak-apa-tomorisakura.vercel.app/api/recipes"
      );
      const json = await response.json();
      setData(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setFetching(false)
    }
  };

  const refreshRecipe = () => {
    setFetching(true);
    getResepData();
  }


  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("RecipeDetail", { resepKey: item.key })}
      >
        <Box p={5}>
          <Box bg={"white"} borderWidth={1} borderColor={"gray.300"}>
            <Box>
              <AspectRatio w="100%" ratio={16 / 9 }>
                <Image source={{ uri: item.thumb }} alt="thumbnail resep" />
              </AspectRatio>
              <Box position={"absolute"} bottom={0} left={0} p={2} bg={"#fe7100"}>
                <Text>{item.dificulty}</Text>
              </Box>
            </Box>

            <Box p={3}>
              <Heading>{item.title}</Heading>
              <HStack alignItems={"center"}>
                <Text>{item.times} </Text>
                <Text>{item.portion} </Text>
              </HStack>
            </Box>

          </Box>
        </Box>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getResepData();
  }, []);


  return (
    <>
      <Header title="Recipes" withLogo={true} />

      {isLoading ? (
        <Center flex={1}>
          <Spinner size={"lg"} color={"#fe7100"}/>
        </Center>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          onRefresh={refreshRecipe}
          refreshing={isFetching}
        />
      )}

    </>
  );
};

export default RecipeScreen;
