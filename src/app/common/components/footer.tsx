import { Flex, HStack, Link as ChakraLink, Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { linkHoverStyle } from "./styling";
import MainLogo from "./logo";

export const MainFooter = () => {
  return (
    <Box px={[10, 20, 40]}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <MainLogo />
        <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
          <ChakraLink ml={5} _hover={linkHoverStyle} as={Link} href="/">
            Home
          </ChakraLink>
          <ChakraLink ml={5} _hover={linkHoverStyle} as={Link} href="/">
            Home
          </ChakraLink>
          <ChakraLink ml={5} _hover={linkHoverStyle} as={Link} href="/">
            Home
          </ChakraLink>
        </HStack>
      </Flex>
      <hr />
      <Text my={8} textAlign="center">
        Copyright by your company | Theme by GetHugoThemes
      </Text>
    </Box>
  );
};
