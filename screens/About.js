import React from "react";
import { Center, Heading, Image, ScrollView, Text, Box, Divider, HStack } from "native-base";
import { Header } from "../components";
import { Ionicons } from '@expo/vector-icons';

const AboutScreen = () => {
  return (
    <>
      <Header title="About" withLogo={true} />

      <ScrollView>
        <Box bg={"white"} p={5} m={5}>
          <Center>
            
            <Image source={require("../assets/logo.png")} alt="Logo" width={180} height={180}/>
            <Heading size={"2xl"}>My Recipes App</Heading>

            <Text fontSize={"lg"} mt={3} textAlign={"justify"}>Ini adalah aplikasi untuk menemukan resep resep kelas dunia yang sangat enak dan mudah dibuat untuk rumahan</Text>
            <Text fontSize={"lg"} mt={3} textAlign={"justify"}>Selain Resep juga ada berbagai tips trick memasak, inspirasi untuk dapur dan masih banyak lagi. Terima kasih kepada tomorisakura untuk Food recipes api bahasa Indonesia 🇮🇩 build with Cheerio and Node js</Text>

            <Divider my={5}/>
            
            <HStack space={8}>
              <Ionicons name="logo-youtube" size={36} color="black" />
              <Ionicons name="logo-twitter" size={36} color="black" />
              <Ionicons name="logo-instagram" size={36} color="black" />
            </HStack>
          
          </Center>
          
        </Box>
      </ScrollView>
    </>
  );
};

export default AboutScreen;
