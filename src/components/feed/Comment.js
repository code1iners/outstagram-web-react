import styled from "styled-components";
import { FatText } from "../shared";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const CommentContainer = styled.div`
  margin-top: 5px;
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

const Comment = ({ author, payload }) => {
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
    </CommentContainer>
  );
};

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};

export default Comment;
