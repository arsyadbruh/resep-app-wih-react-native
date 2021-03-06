import React, { useEffect, useState } from "react";
import {
  Center,
  HStack,
  ScrollView,
  Text,
  Box,
  Image,
  AspectRatio,
  Heading,
  Spinner,
  FlatList,
} from "native-base";
import { Header } from "../components";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ArticleScreen = ({ navigation }) => {
  const [isArticleLoading, setArticleLoading] = useState(true);
  const [isCategoryLoading, setCategoryLoading] = useState(true);
  const [isFetching, setFetching] = useState(false);
  const [article, setArticle] = useState([]);
  const [category, setCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const fetchArticle = async (key) => {
    try {
      const response = await fetch(
        "https://masak-apa-tomorisakura.vercel.app/api/categorys/article/" + key
      );
      const json = await response.json();
      setArticle(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setArticleLoading(false);
      setFetching(false);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch(
        "https://masak-apa-tomorisakura.vercel.app/api/categorys/article"
      );
      const json = await response.json();
      setCategory(json.results);
      setActiveCategory(json.results[0].key);

      // calling updater
      // karena setState yang tidak langsung update
      setActiveCategory((state) => {
        fetchArticle(state);
        return state;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setCategoryLoading(false);
    }
  };

  const articleItem = ({ item }) => {
    const tagCategory = activeCategory;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ArticleDetail", {
            key: item.key,
            tag: tagCategory,
            label: item.tags,
          })
        }>
        <Box px={5} mb={30} rounded={"md"}>
          <Box borderWidth={1} borderColor={"gray.300"} overflow={"hidden"} rounded={"lg"}>
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image source={{ uri: item.thumb }} alt="Article Thumnail" />
              </AspectRatio>
              <Box position={"absolute"} bottom={0} right={0} p={2} bg={"#fe7100"}>
                <HStack alignItems={"center"}>
                  <FontAwesome name="hashtag" size={12} color="white" />
                  <Text color={"white"}> {item.tags}</Text>
                </HStack>
              </Box>
            </Box>
            <Box p={4}>
              <Heading size={"md"}>{item.title}</Heading>
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  };

  const handleCategory = (key) => {
    setActiveCategory(key);
    setArticleLoading(true);

    // calling updater
    setActiveCategory((state) => {
      refreshArcticle(state);
      return state;
    });
  };

  const refreshArcticle = (key = null) => {
    setFetching(true);

    // menyesuaikan dengan handleCategory
    // karena setState tidak langsung melakukan update value
    key === null ? fetchArticle(activeCategory) : fetchArticle(key);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <Header title="Articles" withLogo={true} />

      {!isCategoryLoading && (
        <Box my={3}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack>
              {category.map((categoryItem, index) => (
                <TouchableOpacity key={index} onPress={() => handleCategory(categoryItem.key)}>
                  <Box
                    bg={activeCategory == categoryItem.key ? "#fe7100" : "gray.700"}
                    py={2}
                    px={5}
                    rounded={"full"}
                    mx={2}
                    ml={index == 0 ? 5 : 0}
                    mr={index == category.length - 1 ? 5 : 2}>
                    <Text color={"white"}>{categoryItem.title}</Text>
                  </Box>
                </TouchableOpacity>
              ))}
            </HStack>
          </ScrollView>
        </Box>
      )}

      {isArticleLoading ? (
        <Center flex={1}>
          <Spinner size={"lg"} color={"#fe7100"} />
        </Center>
      ) : (
        <FlatList
          data={article}
          keyExtractor={(item) => item.key}
          renderItem={articleItem}
          onRefresh={refreshArcticle}
          refreshing={isFetching}
        />
      )}
    </>
  );
};

export default ArticleScreen;
