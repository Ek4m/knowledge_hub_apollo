"use client";
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { COLORS, STYLES } from "@/app/common/constants";
import { useCreateDoc } from "../hooks";

export const DocumentEditor = () => {
  const { onSubmit, isSubmitting, errors } = useCreateDoc();

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
          </FormControl>
          <br />
          <FormControl isInvalid={!!errors.content}>
            <FormLabel>Content</FormLabel>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              id="text_editor"
              textareaName="content"
              init={{
                height: 500,
                menubar: false,
                placeholder: "Add content...",
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help | link",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </FormControl>
          <br />
          <Button
            type="submit"
            isLoading={isSubmitting}
            width={"100%"}
            bg={COLORS.red}
            color="white"
          >
            Create
          </Button>
        </form>
      </Box>
    </Box>
  );
};
