import React, {useEffect, useState} from "react";
import { Center, Text } from "native-base";
import { Header } from "../components";

const ArticleScreen = () => {
  const [isArticleLoading, setArticleLoading] = useState(true);
  const [isCategoryLoading, setCategoryLoading] = useState(true);
  const [isFetching, setFetching] = useState(false);
  const [article, setArticle] = useState([]);
  const [category, setCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const fetchData = (key) => {};

  const fetchCategory = async() => {

    try {
      const response = await fetch("https://masak-apa-tomorisakura.vercel.app/api/categorys/article");
      const json = await response.json();
      setCategory(json.results);
      setActiveCategory(json.results[0].key);
      fetchData(activeCategory);
    } catch (error) {
      console.error(error);
    } finally {
      setCategoryLoading(false);
    }

  };


  useEffect( () => {
    fetchCategory();
  }, []);

  return (
    <>
      <Header title="Articles" withLogo={true} />
      <Center flex={1}>
        <Text fontSize="xl">Article Screen</Text>
      </Center>
    </>
  );
};

export default ArticleScreen;
