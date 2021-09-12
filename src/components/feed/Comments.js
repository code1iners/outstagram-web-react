import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser.js";
import Comment from "./Comment.js";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id
    }
  }
`;

// comments start
const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-size: 10px;
  font-weight: 600;
`;
// comments end

// comments form start
const CommentFormContainer = styled.div`
  margin-top: 20px;
  padding: 20px 0px;
  border-top: 1px solid ${(props) => props.theme.borderColor};

  input {
    width: 100%;
    letter-spacing: 1.5px;
  }
`;
// comments form end

const Comments = ({ photoId, author, caption, commentCount, comments }) => {
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
    <CommentsContainer>
      {/* caption */}
      <Comment author={author} payload={caption} />

      {/* comment count */}
      <CommentCount>
        {commentCount > 1
          ? `${commentCount} comments`
          : `${commentCount} comment`}
      </CommentCount>

      {/* comment list */}
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          payload={comment.payload}
        />
      ))}

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
    </CommentsContainer>
  );
};

Comments.propTypes = {
  photoId: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  caption: PropTypes.string,
  commentCount: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      payload: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      }),
    })
  ),
};

export default Comments;
