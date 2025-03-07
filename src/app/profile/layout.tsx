import { Box } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { STYLES } from "../common/constants";
import { ProfileNavbar } from "./components";

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <Box display="flex" flexDirection={"row"} px={STYLES.commonXPadding}>
      <ProfileNavbar />
      <Box flex={"1"} minHeight="50vh" overflowY={"scroll"}>
        {children}
      </Box>
    </Box>
  );
}
