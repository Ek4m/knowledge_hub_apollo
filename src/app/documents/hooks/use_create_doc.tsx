import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";
import { useToast } from "@chakra-ui/react";

import { ERROR_CODES } from "@/app/graphql/constants";

import { CREATE_DOC_QUERY } from "../queries";

export const useCreateDoc = () => {

  const [submit, { loading }] = useMutation(CREATE_DOC_QUERY, {
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
        title: formData.get("title"),
        content: formData.get("content"),
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
          description: "Document was created successfully",
          duration: 1500,
        });
        router.push("/");
      }
    },
    [submit, toast, router]
  );

  return { onSubmit, isSubmitting: loading, errors: formErrors };
};
