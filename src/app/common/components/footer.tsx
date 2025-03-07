import { Flex, HStack, Link as ChakraLink, Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { linkHoverStyle } from "./styling";
import MainLogo from "./logo";
import { STYLES } from "../constants";

export const MainFooter = () => {
  return (
    <Box mt={20} px={STYLES.commonXPadding}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <MainLogo />
        <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
          <ChakraLink ml={5} _hover={linkHoverStyle} as={Link} href="/">
            Home
          </ChakraLink>
          <ChakraLink
            ml={5}
            _hover={linkHoverStyle}
            as={Link}
            href="/documents/new"
          >
            Try it out
          </ChakraLink>
          <ChakraLink ml={5} _hover={linkHoverStyle} as={Link} href="/contact">
            Contact
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
