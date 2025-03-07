import { Box } from "@chakra-ui/react";
import React, { PropsWithChildren, ReactNode } from "react";
import { STYLES } from "../common/constants";

export default function ProfileLayout({
  navbar,
  children,
}: PropsWithChildren<{ navbar: ReactNode }>) {
  return (
    <Box display="flex" flexDirection={"row"} px={STYLES.commonXPadding}>
      {navbar}
      <Box flex={"1"} minHeight="50vh" overflowY={"scroll"}>
        {children}
      </Box>
    </Box>
  );
}
