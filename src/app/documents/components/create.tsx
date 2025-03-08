"use client";
import React, { useContext } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { COLORS, STYLES } from "@/app/common/constants";
import { useCreateDoc } from "../hooks";
import { CategoryContext } from "@/app/category/contexts";
import { Select } from "@/app/common/components/select";
import { RichTextEditor } from "./text_editor";

export const CreateDocument = () => {
  const { onSubmit, isSubmitting, errors, setCategory, categoryId } =
    useCreateDoc();
  const { data: categories } = useContext(CategoryContext);
  return (
    <Box>
      <Box px={STYLES.commonXPadding}>
        <br />
        <Heading>Create new paper</Heading>
        <br />
        <hr />
        <br />
        <form onSubmit={onSubmit}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>Title of project</FormLabel>
            <Input placeholder="Enter title..." name="title" />
            <FormErrorMessage>{errors.title}</FormErrorMessage>
          </FormControl>
          <br />
          <FormControl isInvalid={!!errors.content}>
            <FormLabel>Content</FormLabel>
            <RichTextEditor
              placeholder="Add content..."
              textareaName="content"
            />
            <FormErrorMessage>{errors.content}</FormErrorMessage>
          </FormControl>
          <br />
          <Flex>
            <FormControl isInvalid={!!errors.categoryId}>
              <Select
                placeholder="Select category..."
                value={categoryId}
                onChange={setCategory}
                options={categories?.map((elem) => ({
                  name: elem.name,
                  value: elem.id.toString(),
                }))}
              />
              <FormErrorMessage>{errors.categoryId}</FormErrorMessage>
            </FormControl>
            <Button
              ml={5}
              type="submit"
              isLoading={isSubmitting}
              width={"100%"}
              bg={COLORS.red}
              color="white"
            >
              Create
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};
