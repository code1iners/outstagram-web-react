import PropTypes from "prop-types";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
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

const Avatar = ({ url = "", username, lg = false }) => {
  return username ? (
    <Link to={`/users/${username}`}>
      <StyledAvatar lg={lg}>
        {url ? <Img src={url} /> : <FontAwesomeIcon icon={faUser} size="lg" />}
      </StyledAvatar>
    </Link>
  ) : (
    <StyledAvatar lg={lg}>
      {url ? <Img src={url} /> : <FontAwesomeIcon icon={faUser} size="lg" />}
    </StyledAvatar>
  );
};

Avatar.propTypes = {
  url: PropTypes.string,
  username: PropTypes.string,
};

export default Avatar;
