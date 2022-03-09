import { createGlobalStyle } from 'styled-components'
import { COLORS } from './constants/colors'

export const GlobalStyle = createGlobalStyle`
  
  *{
    font-family: Averta Demo PE, sans-serif;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  body {
    margin: 0;
    padding: 0;
    position: relative;
    background: ${COLORS.white};
  }
  ol, ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    outline: none !important;
    color: inherit;
  }

  p, h1, h2, h3, h4, h5, h6, ul, li {
    padding: 0;
    margin: 0;
  }
  img{
    width: auto;
    height: auto;
  }

  button {
    border: none; 
    outline: none;
    cursor: pointer;
    
  }
  textarea:focus, input:focus{
    outline: none;
  }
  input{
    outline: none;
    border: none;
  }

`
