const Link = (props) => {
  let {to, text, className, style} = props;

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