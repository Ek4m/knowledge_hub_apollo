"use client";
import { Editor } from "@tinymce/tinymce-react";
import React, { FC } from "react";

interface TextEditorProps {
  placeholder: string;
  value?: string;
  onChange?(value: string): void;
  textareaName?: string;
}

export const RichTextEditor: FC<TextEditorProps> = ({
  onChange,
  placeholder,
  value,
  textareaName,
}) => {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      id="text_editor"
      value={value}
      onEditorChange={onChange}
      textareaName={textareaName}
      init={{
        height: 500,
        menubar: false,
        placeholder,
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
  );
};
