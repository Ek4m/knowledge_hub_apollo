import { Box } from "@chakra-ui/react";
import { Metadata } from "next";
import React from "react";
import { LoginForm } from "../components";

export const metadata: Metadata = {
  title: "Sign in | DKH",
};

const LoginPage = () => {
  return (
    <Box width={"100%"}>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
