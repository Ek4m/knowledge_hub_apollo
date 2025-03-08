"use client";
import React, { FC } from "react";
import { IDoc } from "../types";
import { Flex, LinkIcon, Text } from "@chakra-ui/icons";
import Link from "next/link";

export const DocListElem: FC<{ doc: IDoc }> = ({ doc }) => {
  return (
    <Flex
      padding={2}
      borderRadius={5}
      transition="0.1s ease 0s"
      _hover={{ bg: "lightgrey" }}
      justifyContent={"space-between"}
      w={"100%"}
    >
      <Link color={"grey"} href={`/documents/${doc.id}`}>
        <Flex alignItems={"center"}>
          <LinkIcon mr={2} fontSize={20} />
          <Text fontSize={"20"}>{doc.title}</Text>
        </Flex>
      </Link>
    </Flex>
  );
};
