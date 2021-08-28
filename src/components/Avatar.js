import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledAvatar = styled.div`
  width: 19px;
  height: 19px;
  border-radius: 15px;
`;

const Img = styled.img`
  width: 100%;
  overflow: hidden;
`;

const Avatar = ({ url = "" }) => {
  console.log("url", url);
  return (
    <StyledAvatar>
      {url ? <Img src={url} /> : <FontAwesomeIcon icon={faUser} size="lg" />}
    </StyledAvatar>
  );
};

export default Avatar;
