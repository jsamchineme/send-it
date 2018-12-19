const Link = ({ to, text, className, style, noAction }) => {
  style = (style === undefined || style === null) ? '' : style;
  className = (className === undefined || className === null) ? '' : className;
  let action = (noAction === undefined || noAction === null) ? 
    `onclick='window.app.funcs.linkHandler(this); return false;'` 
    : '';

  return (`
    <a 
      href='${to}'
      ${action}
      class='${className}' style='${style}'
    > 
      ${text}
    </a>
  `);
}

export default Link;