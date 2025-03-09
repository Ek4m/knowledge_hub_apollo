"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  OnDataOptions,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { useParams } from "next/navigation";
import { Spinner } from "@chakra-ui/react";

import {
  EDIT_DOC_MUTATION,
  EDIT_DOC_SUBSCRIPTION,
  GET_DOC_QUERY,
} from "../queries";
import { RichTextEditor } from "./text_editor";
import { IDoc } from "../types";
import { UserContext } from "@/app/user/contexts";

export const EditDoc = () => {
  const params = useParams();
  const { data: user } = useContext(UserContext);
  const [value, setValue] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  const timeout = useRef<string | number | NodeJS.Timeout | undefined>(
    undefined
  );

  const { data, loading } = useQuery(GET_DOC_QUERY, {
    variables: { id: params.id },
  });
  const [mutate] = useMutation(EDIT_DOC_MUTATION);

  const onChangeEditor = useCallback(
    (text: string) => {
      if (!isChanging) {
        setValue(text);
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          const id = data.docDetails.id;
          const body = { id, content: text };
          mutate({ variables: { body } });
          clearTimeout(timeout.current);
        }, 2000);
      }
      setIsChanging(false);
    },
    [data, mutate, isChanging]
  );

  const onData = useCallback(
    (options: OnDataOptions<{ doccontentedited: IDoc }>) => {
      const {
        data: { data: response },
      } = options;
      if (response) {
        const content = response.doccontentedited.content;
        setValue(content);
        setIsChanging(true);
      }
    },
    []
  );

  useSubscription(EDIT_DOC_SUBSCRIPTION, {
    skip: !value,
    onData,
    variables: { userId: user?.id },
  });

  useEffect(() => {
    if (data) setValue(data.docDetails.content);
  }, [data]);

  return (
    <>
      {loading && <Spinner size={"xl"} />}
      {(value || data) && (
        <RichTextEditor
          value={value}
          onEditorChange={onChangeEditor}
          placeholder="Add content..."
        />
      )}
    </>
  );
};
