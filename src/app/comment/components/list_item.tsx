"use client";
import React, { FC, useContext, useMemo } from "react";
import { IComment } from "../types";
import { FaUserCircle } from "react-icons/fa";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { datePrettify } from "@/app/common/utils";
import { UserContext } from "@/app/user/contexts";

export const CommentListItem: FC<{ c: IComment }> = ({ c }) => {
  const { data: user } = useContext(UserContext);

  const title = useMemo(() => {
    if (user?.id === c.user.id) return "You";
    return `${c.user.profile?.firstName} ${c.user.profile?.lastName}`;
  }, [user, c]);
  return (
    <Flex alignItems={"flex-start"} py={10}>
      <FaUserCircle size={30} />
      <Box ml={5} flex={1}>
        <Flex mb={2}>
          <Heading size="sm" mr={5}>
            {title}
          </Heading>
          <code>{datePrettify(c.createdAt)}</code>
        </Flex>
        <Text>{c.content}</Text>
      </Box>
    </Flex>
  );
};
