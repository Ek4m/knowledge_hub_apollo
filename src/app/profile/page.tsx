import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { COLORS } from "../common/constants";

export default function PersonalProfilePage() {
  return (
    <Box pl={10}>
      <Heading>Personal info</Heading>
      <br />
      <hr />
      <br />
      <form>
        <Grid
          gridTemplateColumns={"repeat(2,48%)"}
          gridRowGap={"5"}
          gridColumnGap={"4%"}
        >
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input placeholder="Ex:John..." />
          </FormControl>
          <FormControl>
            <FormLabel>Last name</FormLabel>
            <Input placeholder="Ex:Doe..." />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Your e-mail..." type="email" />
          </FormControl>
          <FormControl>
            <FormLabel color={"white"}>Email</FormLabel>
            <Button color={"white"} width={"100%"} bg={COLORS.red}>
              Update
            </Button>
          </FormControl>
        </Grid>
      </form>
    </Box>
  );
}
