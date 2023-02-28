import "./index.scss";

function Button({ value, children, className, onClick, icon }) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {icon}
      {value}
      {children}
    </button>
  );
}

export default Button;
