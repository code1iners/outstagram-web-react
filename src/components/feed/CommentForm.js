import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";

// mutations
const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id
    }
  }
`;

// comment form start
const CommentFormContainer = styled.div`
  margin-top: 20px;
  padding: 10px 2px;
  border-top: 1px solid ${(props) => props.theme.borderColor};

  input {
    width: 100%;
    letter-spacing: 1.5px;
  }
`;
// comment form end

const CommentForm = ({ photoId }) => {
  const { data: userData } = useUser();
  const { register, handleSubmit, getValues, setValue } = useForm();
  const createCommentUpdate = (cache, result) => {
    // stored form payload data.
    const { payload } = getValues();

    // form text input clear.
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;

    if (ok && userData.me) {
      // create new comment object.
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now() + "",
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      };

      // create comment cache fragment.
      const newCommentCache = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment abc on Comment {
            id
            payload
            isMine
            createdAt
            user {
              username
              avatar
            }
          }
        `,
      });

      // update apollo cache.
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(previous) {
            return [...previous, newCommentCache];
          },
          commentCount(previous) {
            return previous + 1;
          },
        },
      });
    }
  };
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    }
  );
  const onValid = (data) => {
    const { payload } = data;
    if (loading) return;

    // create new comment.
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });

    // add cache which created a new comment.
  };

  return (
    <CommentFormContainer>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("payload", {
            required: "Comment is required.",
          })}
          autoComplete="off"
          type="text"
          placeholder="write a comment..."
        />
      </form>
    </CommentFormContainer>
  );
};

export default CommentForm;
