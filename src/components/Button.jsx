import PropTypes from "prop-types";

function Button({ variant, size, text, textColor, bgColor, onClick, styled }) {
  const classes = `button ${variant} ${size}`;
  const styles = {
    color: textColor,
    backgroundColor: bgColor,
  };

  return (
    <button
      className={classes}
      style={variant === "outline" ? styled || {} : { ...styles, ...styled }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["fill", "outline"]),
  size: PropTypes.oneOf(["small", "medium"]),
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  variant: "fill",
  size: "medium",
  textColor: "#ffffff", // Default text color (white)
  bgColor: "#333", // Default background color (dark gray)
};

export default Button;
