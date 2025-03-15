"use client";
import React, { useCallback, useEffect } from "react";
import { Flex, Spinner } from "@chakra-ui/react";

import { COLORS } from "@/app/common/constants";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();
  const onLogout = useCallback(async () => {
    await signOut({ redirect: false });
    router.push("/");
  }, [router]);

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
