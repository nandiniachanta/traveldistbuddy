import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap');
  body {
    margin: 0;
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    background: 
      linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.2)),
      url('/bgimage.jpg') no-repeat center center fixed;
    background-size: cover;
    min-height: 100vh;
  }
`;

export default GlobalStyle;