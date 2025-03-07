import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";
import Cookie from "js-cookie";

import { ERROR_CODES } from "@/app/graphql/constants";
import { UserContext } from "@/app/user/contexts";

import { __access_token, __refresh_token } from "../constants/values";
import { LOGIN_QUERY } from "../queries";

export const useLogin = () => {
  const { refetch } = useContext(UserContext);

  const [submit, { loading }] = useMutation(LOGIN_QUERY, {
    errorPolicy: "all",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const toast = useToast();
  const router = useRouter();

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormErrors({});
      const formData: FormData = new FormData(e.target as HTMLFormElement);
      const body = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
      const result = await submit({ variables: { body } });
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions) {
          const extension = error.extensions;
          const errors = extension.errors as Record<string, string>;
          switch (extension.code) {
            case ERROR_CODES.BAD_USER_INPUT:
              setFormErrors(errors);
              break;
            default:
              toast({
                status: "error",
                position: "top-right",
                title: errors.error,
                description: errors.message,
                duration: 2000,
              });
          }
        }
      } else {
        const {
          signIn: { accessToken, refreshToken },
        } = result.data;
        const date = new Date();
        date.setDate(date.getDate() + 1);
        Cookie.set(__access_token, accessToken, { expires: date });
        date.setDate(date.getDate() + 4);
        Cookie.set(__refresh_token, refreshToken, { expires: date });
        toast({
          status: "success",
          position: "top-right",
          title: "SUCCESS!",
          description: "Logged in successfully",
          duration: 2000,
        });
        await refetch!();
        router.push("/");
      }
    },
    [submit, toast, router, refetch]
  );

  return { onSubmit, isSubmitting: loading, errors: formErrors };
};
