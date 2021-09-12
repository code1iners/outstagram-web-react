import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";

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
      commentCount
      comments {
        id
        payload
        isMine
        createdAt
        user {
          username
          avatar
        }
      }
      createdAt
      isMine
      isLiked
    }
  }
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      {/* Page title */}
      <PageTitle title="Home" />

      {/* Feeds */}
      {data?.seeFeeds?.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
};
export default Home;
