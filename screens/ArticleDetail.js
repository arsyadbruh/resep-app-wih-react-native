import React, {useEffect, useState} from "react";
import { HStack, ScrollView, Text, Box, Image, AspectRatio, Heading, Spinner, Center, Circle } from "native-base";
import { Header } from "../components";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const ArticleDetailScreen = ({route}) => {

    const [isLoading, setLoading] = useState(true);
    const [articleDetail, setArticleDetail] = useState([]);

    const fetchArticleDetail = async () => {
        const tag = route.params.tag;
        const key = route.params.key;
        try {
          const response = await fetch("https://masak-apa-tomorisakura.vercel.app/api/article/" + tag + "/" + key);
          const json = await response.json();
          setArticleDetail(json.results);
        } catch (error) {
          console.error(error);
        } finally {
            setLoading(false);
            console.log("finaly : "+isLoading)
        }
    };

    useEffect( () => {
        fetchArticleDetail();
    }, []);



    return (
        <>
            <Header title="Article" withBackBtn={true} />
            {/* {console.log(articleDetail)} */}
            {console.log("in return isLoading : "+isLoading)}
            {isLoading ? (
                <Center flex={1}>
                    <Spinner size={"lg"} color={"#fe7100"}/>
                </Center>
            ) : (
                <Box p={5}>
                    <Box>
                        <AspectRatio w="100%" ratio={16 / 9 }>
                            <Image source={{ uri: articleDetail.thumb }} alt="Article Thumbnail" />
                        </AspectRatio>
                        <Box position={"absolute"} bottom={0} left={0} p={2} bg={"#fe7100"}>
                            <HStack alignItems={"center"}>
                                <FontAwesome name="hashtag" size={12} color="white" />
                                <Text color={"white"}> {route.params.label}</Text>
                            </HStack>
                        </Box>
                    </Box>
                    <Box>
                        <Heading my={3}>{articleDetail.title}</Heading>
                        <HStack alignItems={"center"}>
                            <Ionicons name="person-circle" size={30} color="#606582" />
                            <Text ml={2} fontSize={18} fontWeight={"bold"}>
                                {articleDetail.author}, 
                                <Text fontSize={18}>  {articleDetail.date_published}</Text>
                            </Text>
                        </HStack>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default ArticleDetailScreen;
