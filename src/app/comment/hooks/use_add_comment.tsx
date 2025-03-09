import { useMutation } from "@apollo/client";
import { FormEvent, useCallback, useState } from "react";
import { ADD_COMMENT_MUTATION } from "../queries";
import { ERROR_CODES } from "@/app/graphql/constants";
import { useToast } from "@chakra-ui/react";

export const useAddComment = (docId: string) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mutate, { loading }] = useMutation(ADD_COMMENT_MUTATION);

  const toast = useToast();

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setErrors({});
      const formData = new FormData(e.target as HTMLFormElement);
      const body = { docId, content: formData.get("content") };
      const result = await mutate({ variables: { body } });
      if (result.errors) {
        const error = result.errors[0];
        console.log(error.extensions);
        if (error.extensions) {
          const serverErrors = error.extensions.errors as Record<
            string,
            string
          >;
          switch (error.extensions.code) {
            case ERROR_CODES.BAD_USER_INPUT:
              // console.log(serverErrors);
              setErrors(serverErrors);
              break;
            default:
              toast({
                status: "error",
                position: "top-right",
                title: serverErrors.error,
                description: serverErrors.message,
                duration: 2000,
              });
          }
        }
      } else {
        toast({
          status: "success",
          position: "top-right",
          title: "Comment was added",
          duration: 2000,
        });
      }
    },
    [docId, mutate, toast]
  );
  return { errors, loading, onSubmit };
};
