"use client";
import React, { FormEvent, useCallback } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Link as ChakraLink,
  Button,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { LOGIN_QUERY } from "../queries";

export const LoginForm = () => {
  const [submit, { loading }] = useMutation(LOGIN_QUERY);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData: FormData = new FormData(e.target as HTMLFormElement);
      const body = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
      await submit({ variables: { body } });
    },
    [submit]
  );

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
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" name="email" />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input id="password" name="password" type="password" />
        </FormControl>
        <br />
        <Button
          isLoading={loading}
          type="submit"
          width={"100%"}
          color="#ffff"
          backgroundColor="#9b59b6"
        >
          Button
        </Button>
      </form>
      <br />
      <br />
      <ChakraLink color="maroon" as={Link} href="/register">
        Don{"'"}t have user? Register
      </ChakraLink>
    </Box>
  );
};
