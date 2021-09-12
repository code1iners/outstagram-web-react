import PropTypes from "prop-types";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Avatar from "../Avatar.js";
import { FatText } from "../shared.js";
import { gql, useMutation } from "@apollo/client";
import Comments from "./Comments.js";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  width: 615px;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  margin: 0px auto;
  margin-bottom: 20px;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

// header start
const PhotoHeader = styled.header`
  padding: 13px 18px;
  display: flex;
  align-items: center;
`;
// header end

// body start
const PhotoBody = styled.img`
  max-width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
`;
// body end

// footer start
const PhotoFooter = styled.footer`
  padding: 15px;
`;
const PhotoActions = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  span {
    cursor: pointer;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;
const PhotoOptions = styled.div`
  cursor: pointer;
`;

const LikesContainer = styled.div`
  margin-top: 15px;
`;

const Likes = styled(FatText)``;
// footer end

const Photo = ({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentCount,
  comments,
}) => {
  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;

    if (ok) {
      const fragmentId = `Photo:${id}`;
      const fragment = gql`
        fragment asdf on Photo {
          isLiked
          likes
        }
      `;

      const readFragment = cache.readFragment({
        id: fragmentId,
        fragment,
      });

      if ("isLiked" in readFragment && "likes" in readFragment) {
        const { isLiked: cachedIsLiked, likes: cachedLikes } = readFragment;
        cache.writeFragment({
          id: fragmentId,
          fragment,
          data: {
            isLiked: !cachedIsLiked,
            likes: cachedIsLiked ? cachedLikes - 1 : cachedLikes + 1,
          },
        });
      }
    }
  };

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: { id },
    update: updateToggleLike,
  });

  return (
    <PhotoContainer key={id}>
      {/* header */}
      <PhotoHeader>
        <Avatar url={user.avatar} lg />
        <Username>{user.username}</Username>
      </PhotoHeader>

      {/* body */}
      <PhotoBody src={file} />

      {/* footer */}
      <PhotoFooter>
        <PhotoActions>
          <div>
            <PhotoAction onClick={toggleLikeMutation}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "tomato" : "inherit" }}
                icon={isLiked ? faSolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
          </div>
          <div>
            <PhotoOptions>
              <FontAwesomeIcon icon={faBookmark} />
            </PhotoOptions>
          </div>
        </PhotoActions>

        <LikesContainer>
          <Likes>{likes <= 1 ? `${likes} like` : `${likes} likes`}</Likes>
        </LikesContainer>

        {/* comments */}
        <Comments
          comments={comments}
          commentCount={commentCount}
          author={user.username}
          caption={caption}
        />
      </PhotoFooter>
    </PhotoContainer>
  );
};

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  caption: PropTypes.string,
  commentCount: PropTypes.number,
};

export default Photo;
