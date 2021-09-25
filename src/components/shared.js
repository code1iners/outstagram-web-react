import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
`;

export const FatLink = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;

export const FatText = styled.span`
  font-weight: 600;
`;

export const SimpleButton = styled.span`
  font-size: 4px;
  border: 1px solid ${(props) => props.theme.accent};
  border-radius: 3px;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.accent};
  padding: 4px;
  cursor: pointer;
  &:hover {
    background-color: inherit;
  }
`;
