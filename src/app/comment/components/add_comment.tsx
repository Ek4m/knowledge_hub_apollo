"use client";
import React, { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  List,
  Textarea,
} from "@chakra-ui/react";

import { COLORS } from "@/app/common/constants";
import { useAddComment, useHandleCommentList } from "../hooks";
import { CommentListItem } from "./list_item";

export const AddComment = () => {
  const { id } = useParams<{ id: string }>();
  const [visible, setVisible] = useState(false);
  const { onSubmit, errors, loading } = useAddComment(id);
  const { commentList } = useHandleCommentList(id);

  console.log(commentList);

  const onOpenHandler = useCallback(() => {
    setVisible(true);
  }, []);

  const onCloseHandler = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <Box width={"100%"}>
      <Heading size="lg">Comments...</Heading>
      <br />
      {visible ? (
        <form onSubmit={onSubmit}>
          <FormControl isInvalid={!!errors.content}>
            <Textarea name="content" placeholder="Anything..." />
            <FormErrorMessage>{errors.content}</FormErrorMessage>
          </FormControl>
          <Flex mt={3}>
            <Button
              type="submit"
              isLoading={loading}
              bg={COLORS.red}
              color="white"
              mr={4}
            >
              Add
            </Button>
            <Button onClick={onCloseHandler}>Cancel</Button>
          </Flex>
        </form>
      ) : (
        <Button onClick={onOpenHandler}>Add comment</Button>
      )}
      <List>
        {commentList?.map((elem) => (
          <CommentListItem key={elem.id} c={elem} />
        ))}
      </List>
    </Box>
  );
};
