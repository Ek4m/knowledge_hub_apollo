import { Box } from "@chakra-ui/react";
import { Metadata } from "next";
import React from "react";
import { RegisterForm } from "../components";

export const metadata: Metadata = {
  title: "Sign up | DKH",
};

const RegisterPage = () => {
  return (
    <Box width={"100%"}>
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;
