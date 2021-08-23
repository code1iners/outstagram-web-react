import styled from "styled-components";

const StyledSeparator = styled.div`
  width: 100%;
  margin: 15px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    margin: 0px 10px;
    color: #8e8e8e;
    font-weight: 600;
    font-size: 12px;
  }
`;

const Separator = () => {
  return (
    <StyledSeparator>
      <div></div>
      <span>Or</span>
      <div></div>
    </StyledSeparator>
  );
};

export default Separator;
