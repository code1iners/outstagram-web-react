import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import styled from "styled-components";
import Layout from "../components/Layout";
import { PHOTO_FRAGMENT, PROFILE_FRAGMENT } from "../fragments";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      ...ProfileFragment
      photos {
        ...PhotoFragment
      }
    }
  }
  ${PROFILE_FRAGMENT}
  ${PHOTO_FRAGMENT}
`;

const ProfileContainer = styled.main`
  width: 615px;
  margin: 0px auto;
  padding: 0px 0px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// header start.
const ProfileHeader = styled.header`
  width: 800px;
  height: 150px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
`;

// avatar start.
const ProfileAvatarWrapper = styled.div`
  max-height: 150px;
  grid-column: 1/5;
  justify-self: center;
`;

const ProfileAvatar = styled.img`
  height: 100%;
  padding: 10px;
  border-radius: 50%;
`;
// avatar end.

const ProfileInfoWrapper = styled.div`
  grid-column: 5/11;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Row = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
`;

// username start.
const Username = styled.span`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1.5px;
`;
// username end.

// follow start.
const FollowWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;
const FollowValue = styled.span`
  font-weight: 700;
  font-size: 14px;
`;
const FollowSuffix = styled.span`
  margin-left: 5px;
  font-size: 12px;
`;
// follow end.

// names start.
const Names = styled(Row)`
  span {
    text-transform: capitalize;
    letter-spacing: 1.25px;
  }
  span:last-child {
    margin-left: 5px;
  }
`;
// names end.

// bio start.
const Bio = styled.span`
  color: gray;
  font-size: 12px;
`;
// bio end.
// header end.

// body start.
const PhotoContainer = styled.section`
  width: 800px;
  margin-top: 40px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(3, 1fr);
`;

const Photo = styled.div`
  height: 250px;
  background: url(${(props) => props.bg});
  background-size: cover;
  cursor: pointer;
`;
// body end.

const Profile = () => {
  const { username } = useParams();
  const {
    data: { seeProfile },
  } = useQuery(SEE_PROFILE_QUERY, {
    variables: { username },
  });
  console.log(seeProfile);
  return (
    <Layout>
      <ProfileContainer>
        {/* my information */}
        <ProfileHeader>
          <ProfileAvatarWrapper>
            <ProfileAvatar src={seeProfile.avatar} />
          </ProfileAvatarWrapper>

          <ProfileInfoWrapper>
            {/* username */}
            <Row>
              <Username>{seeProfile.username}</Username>
            </Row>

            {/* follows */}
            <Row>
              <FollowWrapper>
                <FollowValue>{seeProfile.totalFollowers}</FollowValue>{" "}
                <FollowSuffix>followers</FollowSuffix>
              </FollowWrapper>

              <FollowWrapper>
                <FollowValue>{seeProfile.totalFollowing}</FollowValue>{" "}
                <FollowSuffix>following</FollowSuffix>
              </FollowWrapper>
            </Row>

            {/* names */}
            <Names>
              <span>{seeProfile.firstName}</span>
              <span>{seeProfile.lastName}</span>
            </Names>

            {/* bio */}
            <Row>
              <Bio>{seeProfile.bio ? seeProfile.bio : "Hello Outstagram!"}</Bio>
            </Row>
          </ProfileInfoWrapper>
        </ProfileHeader>

        {/* photos */}
        <PhotoContainer>
          {seeProfile?.photos.map((photo) => (
            <Photo bg={photo.file} />
          ))}
        </PhotoContainer>
      </ProfileContainer>
    </Layout>
  );
};

export default Profile;
