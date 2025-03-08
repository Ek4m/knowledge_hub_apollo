"use client";
import { useQuery } from "@apollo/client";
import React, { useEffect, useMemo } from "react";
import { GET_DOC_QUERY } from "../queries";
import { useParams } from "next/navigation";
import { IDoc } from "../types";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import { datePrettify } from "@/app/common/utils";

export const DocDetails = () => {
  const params = useParams();

  const { data, loading } = useQuery(GET_DOC_QUERY, {
    variables: { id: params.id },
    errorPolicy: "all",
  });

  const doc = useMemo<IDoc | null>(
    function (): IDoc | null {
      if (data) return data.docDetails;
      return null;
    },
    [data]
  );

  useEffect(() => {
    if (doc) document.title = doc.title;
  }, [doc]);

  return (
    <Box>
      {loading && <Spinner size="xl" />}
      {doc && (
        <>
          <Heading size="lg">{doc.title}</Heading>
          <i>Created at: {datePrettify(doc.createdAt)}</i>
        </>
      )}
      <br />
      <br />
      {doc && <div dangerouslySetInnerHTML={{ __html: doc.content }} />}
    </Box>
  );
};
