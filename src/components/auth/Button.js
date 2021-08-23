import styled from "styled-components";

const StyledButton = styled.input`
  width: 100%;
  margin-top: 12px;
  padding: 8px 0px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  border: none;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

const Button = (props) => {
  return <StyledButton {...props} />;
};

export default Button;
