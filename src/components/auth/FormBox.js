import styled from "styled-components";
import { BaseBox } from "../shared";

const Container = styled(BaseBox)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 35px 40px 25px 40px;
  margin-bottom: 15px;
  form {
    width: 100%;
    margin-top: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const FormBox = ({ children }) => {
  return <Container>{children}</Container>;
};
export default FormBox;
