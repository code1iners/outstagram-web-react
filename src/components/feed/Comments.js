import PropTypes from "prop-types";
import styled from "styled-components";
import Comment from "./Comment.js";

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

const Comments = ({ author, caption, commentCount, comments }) => {
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
    </CommentsContainer>
  );
};

Comments.propTypes = {
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
