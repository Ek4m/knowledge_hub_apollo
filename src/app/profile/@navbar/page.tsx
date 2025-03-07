import React from "react";
import Link from "next/link";
import { HStack, Link as ChakraLink } from "@chakra-ui/react";

import { COLORS } from "@/app/common/constants";

const ProfileNavbar = () => {
  return (
    <HStack
      flexDirection="column"
      alignItems={"flex-start"}
      as={"nav"}
      borderRight={`1px solid ${COLORS.red}`}
      width={[40]}
    >
      <ChakraLink as={Link} href="/profile">
        Personal info
      </ChakraLink>
      <ChakraLink as={Link} href="/documents">
        My documents
      </ChakraLink>
    </HStack>
  );
};

export default ProfileNavbar;
