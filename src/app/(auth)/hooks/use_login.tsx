import { FormEvent, useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useToast } from "@chakra-ui/react";

export const useLogin = () => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const toast = useToast();

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormErrors({});
      try {
        const formData: FormData = new FormData(e.target as HTMLFormElement);
        const body = {
          email: formData.get("email"),
          password: formData.get("password"),
        };
        const result = await signIn("credentials", {
          redirect: false,
          ...body,
        });
        if (result?.error) {
          toast({
            status: "error",
            position: "top-right",
            title: "Invalid credentials",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [toast]
  );

  return { onSubmit, isSubmitting: false, errors: formErrors };
};
