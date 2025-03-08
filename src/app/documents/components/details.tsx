"use client";
import { useQuery } from "@apollo/client";
import React, { Fragment, useEffect, useMemo } from "react";
import { GET_DOC_QUERY } from "../queries";
import { useParams } from "next/navigation";
import { IDoc } from "../types";
import { Box, Button, Heading, Spinner } from "@chakra-ui/react";
import { datePrettify } from "@/app/common/utils";
import { EditIcon } from "@chakra-ui/icons";
import { COLORS } from "@/app/common/constants";
import Link from "next/link";

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
          <i>{datePrettify(doc.createdAt)}</i>
        </>
      )}
      <br />
      <br />
      {doc && (
        <Fragment>
          <div dangerouslySetInnerHTML={{ __html: doc.content }} />
          <br />
          <Link href={`/documents/${doc.id}/edit`}>
            <Button bg={COLORS.red} color={"white"}>
              <EditIcon mr={1} />
              Edit
            </Button>
          </Link>
        </Fragment>
      )}
    </Box>
  );
};
