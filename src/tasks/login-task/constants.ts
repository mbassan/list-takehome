export const CSS_CLASS_NAME = 'di-name-is';

export const CSS_CLASS = `
.${CSS_CLASS_NAME} {
  color: blue;
  font-size: 50px;
  background-color: yellow;
  padding: 10px;
  position: absolute;
  z-index: 10000;
  left: 100px;
  display: none;
}
  
@media print {
  .${CSS_CLASS_NAME} {
    display: block;
  }
}
`;
