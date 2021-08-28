import { gql, useQuery } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";

const FEED_QUERY = gql`
  query seeFeeds {
    seeFeeds {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
    }
  }
`;

const PhotoContainer = styled.div`
  width: 615px;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
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
  min-width: 100%;
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
`;

const PhotoAction = styled.div`
  margin-right: 10px;
`;
const PhotoOptions = styled.div``;

const LikesContainer = styled.div`
  margin-top: 15px;
`;

const Likes = styled(FatText)``;
// footer end

const Home = () => {
  const history = useHistory();

  const { data } = useQuery(FEED_QUERY);
  console.log(data);

  return (
    <div>
      {data?.seeFeeds?.map((photo) => (
        <PhotoContainer key={photo.id}>
          {/* header */}
          <PhotoHeader>
            <Avatar url={photo.user.avatar} lg />
            <Username>{photo.user.username}</Username>
          </PhotoHeader>

          {/* body */}
          <PhotoBody src={photo.file} />

          {/* footer */}
          <PhotoFooter>
            <PhotoActions>
              <div>
                <PhotoAction>
                  <FontAwesomeIcon size="lg" icon={faHeart} />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon size="lg" icon={faPaperPlane} />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon size="lg" icon={faComment} />
                </PhotoAction>
              </div>
              <div>
                <PhotoOptions>
                  <FontAwesomeIcon size="lg" icon={faBookmark} />
                </PhotoOptions>
              </div>
            </PhotoActions>

            <LikesContainer>
              <Likes>
                {photo.likes <= 1
                  ? `${photo.likes} like`
                  : `${photo.likes} likes`}
              </Likes>
            </LikesContainer>
          </PhotoFooter>
        </PhotoContainer>
      ))}
    </div>
  );
};
export default Home;
