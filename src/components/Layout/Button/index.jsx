import "./index.scss";

function Button({ value, children, className, onClick }) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {value}
      {children}
    </button>
  );
}

export default Button;
