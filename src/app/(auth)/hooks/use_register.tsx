import { useMutation } from "@apollo/client";
import { REGISTER_QUERY } from "../queries";
import { FormEvent, useCallback, useState } from "react";
import { ERROR_CODES } from "@/app/graphql/constants";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const router = useRouter();
  const [submit, { loading }] = useMutation(REGISTER_QUERY, {
    errorPolicy: "all",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const toast = useToast();

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormErrors({});
      const formData: FormData = new FormData(e.target as HTMLFormElement);
      const body = {
        email: formData.get("email"),
        password: formData.get("password"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
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
        toast({
          status: "success",
          position: "top-right",
          title: "SUCCESS!",
          description: "Registered successfully",
          duration: 2000,
        });
        router.push("/login");
      }
    },
    [submit, toast, router]
  );

  return { onSubmit, isSubmitting: loading, errors: formErrors };
};
