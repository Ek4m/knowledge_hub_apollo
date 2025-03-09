"use client";
import React, { FC } from "react";
import { IComment } from "../types";
import { FaUserCircle } from "react-icons/fa";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { datePrettify } from "@/app/common/utils";

export const CommentListItem: FC<{ c: IComment }> = ({ c }) => {
  return (
    <Flex alignItems={"flex-start"} p={10}>
      <FaUserCircle size={30} />
      <Box ml={5} flex={1}>
        <Flex mb={2}>
          <Heading size="sm" mr={5}>
            {c.user.email}
          </Heading>
          <code>{datePrettify(c.createdAt)}</code>
        </Flex>
        <Text>{c.content}</Text>
      </Box>
    </Flex>
  );
};
