import { STYLES } from "@/app/common/constants";
import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { DocDetails } from "../components";

const DocumentDetailsPage = () => {
  return (
    <Box px={STYLES.commonXPadding}>
      <Heading size="xl">Document details</Heading>
      <br />
      <hr />
      <br />
      <DocDetails />
    </Box>
  );
};

export default DocumentDetailsPage;
