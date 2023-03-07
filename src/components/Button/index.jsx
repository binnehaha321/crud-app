import "./index.scss";

function Button({ value, children, className, onClick, icon, ...rest }) {
  return (
    <button type="button" className={className} onClick={onClick} {...rest}>
      {icon}
      {value}
      {children}
    </button>
  );
}

export default Button;
