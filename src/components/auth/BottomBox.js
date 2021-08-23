import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

const Container = styled(BaseBox)`
  padding: 20px 0pc;
  text-align: center;
  a {
    font-weight: 600;
    color: ${(props) => props.theme.accent};
    margin-left: 6px;
  }
`;

const BottomBox = ({ cta, link, linkText }) => {
  return (
    <Container>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </Container>
  );
};

BottomBox.propTypes = {
  cta: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default BottomBox;
