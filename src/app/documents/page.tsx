import React, { use } from "react";
import { getDocs } from "./actions/get_docs";
import { Box } from "@chakra-ui/react";
import { STYLES } from "../common/constants";
import { DocListElem } from "./components";

const DocumentsPage = () => {
  const { data } = use(getDocs());
  return (
    <Box px={STYLES.commonXPadding}>
      {data.map((doc) => (
        <DocListElem doc={doc} key={doc.id} />
      ))}
    </Box>
  );
};

export default DocumentsPage;
