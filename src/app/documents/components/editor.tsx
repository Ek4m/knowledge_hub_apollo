"use client";
import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { STYLES } from "@/app/common/constants";

export const DocumentEditor = () => {
  const [textValue, setTextValue] = useState("");

  return (
    <Box>
      <Box px={STYLES.commonXPadding}>
        <br />
        <Heading>Create new paper</Heading>
        <br />
        <hr />
        <br />
        <form>
          <FormControl>
            <FormLabel>Title of project</FormLabel>
            <Input placeholder="Enter title..." />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Content</FormLabel>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              value={textValue}
              onEditorChange={setTextValue}
              id="text_editor"
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
        </form>
      </Box>
    </Box>
  );
};
