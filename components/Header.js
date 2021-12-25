import {
  ArrowBackIcon,
  Box,
  HStack,
  Image,
  Pressable,
  SearchIcon,
  Text,
} from "native-base";
import React from "react";
import { useNavigation } from "@react-navigation/core";

const Header = ({ title, withLogo, withBackBtn }) => {
  const navigation = useNavigation();

  return (
    <Box bg="#ff7800" paddingX={15} paddingY={2}>
      <HStack alignItems="center" justifyContent="space-between">
        <HStack alignItems="center">
          {withLogo && (
            <Image
              source={require("../assets/logo.png")}
              size="xs"
              alt="icon"
              marginRight="2.5"
            />
          )}
          {withBackBtn && (
            <Pressable onPress={() => navigation.goBack()}>
              <ArrowBackIcon color="white" size="md" marginRight="3" />
            </Pressable>
          )}
          <Text color="white" fontWeight="semibold" fontSize="2xl">
            {title}
          </Text>
        </HStack>
        <SearchIcon color="white" size="sm" />
      </HStack>
    </Box>
  );
};

export default Header;
