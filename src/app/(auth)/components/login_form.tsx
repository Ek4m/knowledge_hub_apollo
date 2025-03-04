"use client";
import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Link as ChakraLink,
  Button,
  Heading,
  FormErrorMessage,
} from "@chakra-ui/react";
import Link from "next/link";
import { useLogin } from "../hooks";

export const LoginForm = () => {
  const { onSubmit, isSubmitting, errors } = useLogin();

  return (
    <Box
      width={["80%", "50%"]}
      margin={"auto"}
      borderRadius="5px"
      padding={"14"}
      boxShadow="0px 1px 15px #ecf0f1"
      marginTop="2rem"
    >
      <Heading size="xl" noOfLines={1}>
        Log in
      </Heading>
      <br />
      <hr />
      <br />
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email address</FormLabel>
          <Input type="email" name="email" placeholder="Ex:john.doe@mail.com" />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <br />
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Ex:johndoe1918..."
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        <br />
        <Button
          isLoading={isSubmitting}
          type="submit"
          width={"100%"}
          color="#ffff"
          backgroundColor="#9b59b6"
        >
          Button
        </Button>
      </form>
      <br />
      <Box display="flex" justifyContent="center">
        <ChakraLink
          textAlign="center"
          color="maroon"
          as={Link}
          href="/register"
        >
          Don{"'"}t have user? Register
        </ChakraLink>
      </Box>
    </Box>
  );
};
