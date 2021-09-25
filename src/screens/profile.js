import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router";
import styled from "styled-components";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import { SimpleButton } from "../components/shared";
import { PHOTO_FRAGMENT, PROFILE_FRAGMENT } from "../fragments";
import { ME_QUERY, useUser } from "../hooks/useUser";

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

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
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
  padding: 5px 0px;
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
const ProfileButton = styled(SimpleButton)`
  margin-left: 10px;
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
  position: relative;
  height: 250px;
  background: url(${(props) => props.bg});
  background-size: cover;
  cursor: pointer;
`;
const Icons = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  &:hover {
    opacity: 1;
  }
`;
const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;
// body end.

const Profile = () => {
  const { username } = useParams();
  const { data: meData } = useUser();
  const client = useApolloClient();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: { username },
  });
  const onCompletedFollowUser = (data) => {
    const {
      followUser: { ok },
    } = data;
    if (!ok) return;
    const { cache } = client;
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(previous) {
          return true;
        },
        totalFollowers(previous) {
          return previous + 1;
        },
      },
    });
  };
  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: { username },
    onCompleted: onCompletedFollowUser,
  });
  const updateUnfollowUser = (cache, result) => {
    const {
      data: {
        unfollowUser: { ok },
      },
    } = result;
    if (!ok) return;
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(previous) {
          return false;
        },
        totalFollowers(previous) {
          return previous - 1;
        },
      },
    });
  };
  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: { username },
    update: updateUnfollowUser,
  });

  const getButton = (seeProfile) => {
    const { isMe, isFollowing } = seeProfile;

    if (isMe) return <ProfileButton>Edit Profile</ProfileButton>;
    if (isFollowing)
      return <ProfileButton onClick={unfollowUser}>Unfollow</ProfileButton>;
    else return <ProfileButton onClick={followUser}>Follow</ProfileButton>;
  };

  return (
    <Layout>
      <PageTitle
        title={
          loading ? "Loading..." : `${data?.seeProfile.username}'s Profile`
        }
      />
      <ProfileContainer>
        {/* my information */}
        <ProfileHeader>
          <ProfileAvatarWrapper>
            <ProfileAvatar src={data?.seeProfile?.avatar} />
          </ProfileAvatarWrapper>

          <ProfileInfoWrapper>
            {/* username */}
            <Row>
              <Username>{data?.seeProfile?.username}</Username>
              {data?.seeProfile ? getButton(data.seeProfile) : null}
            </Row>

            {/* follows */}
            <Row>
              <FollowWrapper>
                <FollowValue>{data?.seeProfile?.totalFollowers}</FollowValue>{" "}
                <FollowSuffix>followers</FollowSuffix>
              </FollowWrapper>

              <FollowWrapper>
                <FollowValue>{data?.seeProfile?.totalFollowing}</FollowValue>{" "}
                <FollowSuffix>following</FollowSuffix>
              </FollowWrapper>
            </Row>

            {/* names */}
            <Names>
              <span>{data?.seeProfile?.firstName}</span>
              <span>{data?.seeProfile?.lastName}</span>
            </Names>

            {/* bio */}
            <Row>
              <Bio>
                {data?.seeProfile?.bio
                  ? data?.seeProfile?.bio
                  : "Hello Outstagram!"}
              </Bio>
            </Row>
          </ProfileInfoWrapper>
        </ProfileHeader>

        {/* photos */}
        <PhotoContainer>
          {data?.seeProfile?.photos.map((photo) => (
            <Photo bg={photo.file} key={photo.id}>
              <Icons>
                <Icon>
                  <FontAwesomeIcon icon={faHeart} />
                  <span>{photo.likes}</span>
                </Icon>
                <Icon>
                  <FontAwesomeIcon icon={faComment} />
                  <span>{photo.commentCount}</span>
                </Icon>
              </Icons>
            </Photo>
          ))}
        </PhotoContainer>
      </ProfileContainer>
    </Layout>
  );
};

export default Profile;
