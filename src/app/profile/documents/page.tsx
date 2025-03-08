"use client";
import React, { useMemo } from "react";
import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";

import { DocListElem } from "@/app/documents/components";
import { GET_MY_DOCS_QUERY } from "@/app/documents/queries";
import { IDoc } from "@/app/documents/types";

const MyDocumentsPage = () => {
  const { data } = useQuery(GET_MY_DOCS_QUERY);

  const docs = useMemo(() => {
    if (data) return data.myDocs;
    return [];
  }, [data]);

  return (
    <Box>
      <Heading>My documents</Heading>
      <br />
      <List>
        {docs.map((doc: IDoc) => (
          <ListItem key={doc.id}>
            <DocListElem doc={doc} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MyDocumentsPage;
