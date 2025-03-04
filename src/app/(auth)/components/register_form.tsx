import React from "react";
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

export const RegisterForm = () => {
  return (
    <Box
      width={["80%", "70", "50%"]}
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
      <form>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input id="password" type="password" />
        </FormControl>
        <br />
        <Button width={"100%"} color="#ffff" backgroundColor="#9b59b6">
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
