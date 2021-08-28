import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledAvatar = styled.div`
  width: ${(props) => (props.lg ? "25px" : "19px")};
  height: ${(props) => (props.lg ? "25px" : "19px")};
  background-color: #2c2c2c;
  border-radius: 50%;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar = ({ url = "", lg = false }) => {
  return (
    <StyledAvatar lg={lg}>
      {url ? <Img src={url} /> : <FontAwesomeIcon icon={faUser} size="lg" />}
    </StyledAvatar>
  );
};

export default Avatar;
