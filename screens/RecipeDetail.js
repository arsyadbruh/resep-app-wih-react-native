import React, {useState, useEffect} from "react";
import { Center, HStack, ScrollView, Text, Box, Image, AspectRatio, Heading, Spinner, FlatList, View, Divider, Circle } from "native-base";
import { Header } from "../components";

const RecipeDetailScreen = ({route}) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getResepDetail = async () => {
    console.log(route.params.resepKey);
    try {
      const response = await fetch(
        `https://masak-apa-tomorisakura.vercel.app/api/recipe/${route.params.resepKey}`
      );
      const json = await response.json();
      setData(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getResepDetail();
  }, [])

  return (
    <>
      <Header title="Recipe Detail" withBackBtn={true} />
      {isLoading ? (
        <Center flex={1}>
          <Spinner size={"lg"} color={"#fe7100"}/>
        </Center>
      ) : (
        <ScrollView p={5}>
          <Box mb={10}>
            <Box mb={5}>
                { data.thumb === null ? (
                  <Image source={require("../assets/dummy2.jpg")} alt="thumbnail resep" h={"56"}/>
                ) : (
                  <Image source={{ uri: data.thumb }} alt="thumbnail resep" h={56} />
                )}
            </Box>
            <Box>
              <Heading size={"xl"}>{data.title}</Heading>
              <Divider my={5}/>
              <Box bg={"orange.300"} px={5} py={3} mb={5}>
                <Heading>Bahan - Bahan : </Heading>
                {
                  data.ingredient.map( (item, index) => (
                    <Text key={index} fontSize={"md"}> - {item}</Text>
                  ))
                }
              </Box>
              <Box>
                <Heading mb={3}>Langkah - Langkah : </Heading>
                {
                  data.step.map( (item, index) => (
                    <HStack key={index} pr={10} alignItems={"flex-start"} mb={2}>
                      <Circle size={"24px"} bg={"#fe7100"} mr={2} mt={1}>{index+1}</Circle>
                      <Text fontSize={"lg"} textAlign={"justify"}>{item.substring(2)}</Text>
                    </HStack>
                  ) )
                }
              </Box>
              <Divider my={5}/>
            </Box>
          </Box>
        </ScrollView>
      )}
    </>
  );
};

export default RecipeDetailScreen;
