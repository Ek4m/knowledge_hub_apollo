import React from "react";
import Link from "next/link";
import { HStack, Link as ChakraLink } from "@chakra-ui/react";

import { COLORS } from "@/app/common/constants";

export const ProfileNavbar = () => {
  return (
    <HStack
      flexDirection="column"
      mr={5}
      alignItems={"flex-start"}
      as={"nav"}
      borderRight={`1px solid ${COLORS.red}`}
      width={[40]}
    >
      <ChakraLink as={Link} href="/profile">
        Personal info
      </ChakraLink>
      <ChakraLink as={Link} href="/profile/documents">
        My documents
      </ChakraLink>
    </HStack>
  );
};
