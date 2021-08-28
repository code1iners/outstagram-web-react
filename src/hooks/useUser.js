import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, userSignOut } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

const useUser = () => {
  const hasAccessToken = useReactiveVar(isLoggedInVar);
  const { data, error } = useQuery(ME_QUERY, {
    skip: !hasAccessToken,
  });

  useEffect(() => {
    if (data?.me === null) {
      console.log(data);
      userSignOut();
    }
  }, [data]);
};

export default useUser;
