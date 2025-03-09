import { OnDataOptions, useQuery, useSubscription } from "@apollo/client";
import { ADD_COMMENT_SUBSCRIPTION, GET_COMMENTS_QUERY } from "../queries";
import { useCallback, useEffect, useState } from "react";
import { IComment } from "../types";

export const useHandleCommentList = (docId: string) => {
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const { data: comments, loading: commentsLoading } = useQuery(
    GET_COMMENTS_QUERY,
    {
      variables: { docId },
    }
  );

  useEffect(() => {
    if (comments) setCommentList(comments.getComments);
  }, [comments]);

  const onData = useCallback(
    (options: OnDataOptions<{ commentadded: IComment }>) => {
      const {
        data: { data: response },
      } = options;
      if (response) {
        const comment = response.commentadded;
        setCommentList([comment, ...commentList]);
      }
    },
    [commentList]
  );

  useSubscription(ADD_COMMENT_SUBSCRIPTION, {
    onData,
    variables: { docId },
  });

  return { commentList, commentsLoading };
};
