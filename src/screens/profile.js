import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
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

const Profile = () => {
  const { username } = useParams();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: { username },
  });
  console.log(data);
  return "Profile";
};

export default Profile;
