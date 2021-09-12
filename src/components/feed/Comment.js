import styled from "styled-components";
import { FatText } from "../shared";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

// mutations.
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      error
    }
  }
`;

// start styled.
const CommentContainer = styled.div`
  margin-top: 7px;
`;
const CommentCaption = styled.span`
  margin-left: 10px;

  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const CommentDeleteButton = styled.button`
  background-color: transparent;
  border: none;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    color: ${(props) => props.theme.fontColor};
  }
`;
// end styled.

const Comment = ({ id, author, payload, isMine, photoId }) => {
  /**
   * initialize delete comment mutation.
   */
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { id },
  });

  /**
   * Update apollo cache when succeed request.
   * @param {Object} cache > Apollo cache.
   * @param {Object} result > Response which Update delete comment mutation.
   */
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;

    if (ok) {
      // delete comment cache in apollo cache.
      cache.evict({ id: `Comment:${id}` });
      // update commentCount field in photo cache.
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentCount(previous) {
            return previous - 1;
          },
        },
      });
    }
  };

  const onDeleteClick = () => {
    deleteCommentMutation({
      update: updateDeleteComment,
    });
  };

  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>
        {payload.split(" ").map((word, wordIndex) =>
          /#[\w]+/.test(word) ? (
            <Fragment key={wordIndex}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </Fragment>
          ) : (
            <Fragment key={wordIndex}>{word} </Fragment>
          )
        )}
      </CommentCaption>

      {isMine ? (
        <CommentDeleteButton onClick={onDeleteClick}>
          <FontAwesomeIcon icon={faMinusCircle} />
        </CommentDeleteButton>
      ) : null}
    </CommentContainer>
  );
};

Comment.propTypes = {
  id: PropTypes.number,
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
  isMine: PropTypes.bool,
  photoId: PropTypes.number,
};

export default Comment;
