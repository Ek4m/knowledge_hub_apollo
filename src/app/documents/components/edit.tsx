"use client";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_DOC_QUERY } from "../queries";
import { useParams } from "next/navigation";
import { RichTextEditor } from "./text_editor";
import { Spinner } from "@chakra-ui/react";

export const EditDoc = () => {
  const params = useParams();
  const [value, setValue] = useState("");

  const { data, loading } = useQuery(GET_DOC_QUERY, {
    variables: { id: params.id },
    errorPolicy: "all",
  });

  useEffect(() => {
    if (data) setValue(data.docDetails.content);
  }, [data]);

  console.log(value);

  return (
    <>
      {loading && <Spinner size={"xl"} />}
      {(value || data) && (
        <RichTextEditor
          value={value}
          onChange={setValue}
          placeholder="Add content..."
        />
      )}
    </>
  );
};
