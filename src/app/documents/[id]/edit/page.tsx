import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { EditDoc } from "../../components";
import { STYLES } from "@/app/common/constants";

const EditDocumentPage = () => {
  return (
    <Box px={STYLES.commonXPadding}>
      <Heading>Edit document</Heading>
      <br />
      <hr />
      <br />
      <EditDoc />
    </Box>
  );
};

export default EditDocumentPage;
