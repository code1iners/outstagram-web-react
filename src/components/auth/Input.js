import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  margin-top: 5px;
  padding: 7px 7px;
  background-color: #fafafa;
  border: 0.5px solid ${(props) => props.theme.borderColor};
  border-radius: 3px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
`;

const Input = (props) => {
  return <StyledInput {...props} />;
};
export default Input;
