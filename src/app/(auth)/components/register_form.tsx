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
import { useRegister } from "../hooks";

export const RegisterForm = () => {
  const { onSubmit, isSubmitting, errors } = useRegister();

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
        Register
      </Heading>
      <br />
      <hr />
      <br />
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email address</FormLabel>
          <Input type="email" name="email" placeholder="Email address..." />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <br />
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Your password..."
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        <br />
        <FormControl isInvalid={!!errors.firstName}>
          <FormLabel htmlFor="firstName">First name</FormLabel>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Ex:John..."
          />
          <FormErrorMessage>{errors.firstName}</FormErrorMessage>
        </FormControl>
        <br />
        <FormControl isInvalid={!!errors.lastName}>
          <FormLabel htmlFor="lastName">Last name</FormLabel>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Ex:Doe..."
          />
          <FormErrorMessage>{errors.lastName}</FormErrorMessage>
        </FormControl>
        <br />
        <Button
          isLoading={isSubmitting}
          type="submit"
          width={"100%"}
          color="#ffff"
          backgroundColor="#9b59b6"
        >
          Register now!
        </Button>
      </form>
      <br />
      <Box display="flex" justifyContent="center">
        <ChakraLink textAlign="center" color="maroon" as={Link} href="/login">
          Already have an account? Log in
        </ChakraLink>
      </Box>
    </Box>
  );
};
