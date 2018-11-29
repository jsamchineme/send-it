const Link = (props) => {
  let {to, text, className, style} = props;
  style = (style === undefined || style === null) ? '' : style;
  className = (className === undefined || className === null) ? '' : className;

  return (`
    <a 
      href='${to}'
      onclick='window.app.funcs.linkHandler(this); return false;' 
      class='${className}' style='${style}'
    > 
      ${text}
    </a>
  `);
}

export default Link;