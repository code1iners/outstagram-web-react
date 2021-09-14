import { gql } from "@apollo/client";
export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentCount
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    payload
    isMine
    createdAt
    user {
      username
      avatar
    }
  }
`;

export const PROFILE_FRAGMENT = gql`
  fragment ProfileFragment on User {
    id
    firstName
    lastName
    username
    bio
    avatar
    totalFollowing
    totalFollowers
    isMe
    isFollowing
  }
`;
