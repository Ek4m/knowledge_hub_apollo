import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { COLORS, STYLES } from "./common/constants";

export default function Home() {
  return (
    <Box px={STYLES.commonXPadding}>
      <Flex py={20} justifyContent={"space-between"}>
        <Flex width={"50%"} flexDirection={"column"} alignItems={"flex-start"}>
          <Heading size={"2xl"}>Documentation Theme By Gethugothemes</Heading>
          <Text my={10} color={"grey"}>
            Lorem ipsum dolor amet, consetetur sadiffspscing elitr, diam nonumy
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua
            At.
          </Text>
          <Button bg={COLORS.red} color="white" p={8}>
            Get started
          </Button>
        </Flex>
        <Image
          alignSelf={"flex-start"}
          height={"auto"}
          width={"30%"}
          src="https://demo.gethugothemes.com/godocs/site/style-1/images/banner_hu5a797fae0707814d8a70dee3017d6ae3_113805_346x352_resize_q90_h2_box.webp"
          alt="panel"
        />
      </Flex>
    </Box>
  );
}
