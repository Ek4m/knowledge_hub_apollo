"use client";
import React, { useCallback, useEffect } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";

import { COLORS } from "@/app/common/constants";
import { __access_token, __refresh_token } from "../constants/values";

const LogoutPage = () => {
  const onLogout = useCallback(async () => {
    Cookies.remove(__access_token);
    Cookies.remove(__refresh_token);
    location.href = "/";
  }, []);
  
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return (
    <Flex
      minHeight={"100vh"}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner size={"xl"} color={COLORS.red} />
    </Flex>
  );
};

export default LogoutPage;
