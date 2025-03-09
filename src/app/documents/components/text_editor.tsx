"use client";
import React, { FC } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { IAllProps } from "@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor";

type IAllPropsWithRemovedFields = Omit<IAllProps, "apiKey">;
type TextEditorProps = IAllPropsWithRemovedFields & {
  placeholder?: string;
};

export const RichTextEditor: FC<TextEditorProps> = ({
  placeholder,
  ...props
}) => {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      {...props}
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
