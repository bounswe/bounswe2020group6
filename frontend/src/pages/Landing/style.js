import styled from "styled-components";
import theme from "../../theme";

export const footerStyle = {
  backgroundColor: theme.main.colors.third,
  height: "200px",
};

export const Content = styled.div`
  background-position: center top;
  background-repeat: no-repeat;
  background-image: url(cactus.jpeg);
  background-size: cover;
  height: 80vh;

  @media only screen and (max-width: 600px) {
    background-position: initial;
  }
`;

export const CtaButton = styled.button`
  background-color: ${theme.main.colors.first};
  height: 80px;
  width: 180px;
  text-align: center;
  line-height: 80px;
  font-size: 32px;
  font-family: Rasa;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  border: none;

  :focus {
    outline: none;
  }

  :hover {
    color: ${theme.main.colors.sixth};
  }
`;
