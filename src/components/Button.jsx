import PropTypes from "prop-types";

function Button({ variant, size, text, textColor, bgColor, onClick, styled }) {
  // Generate the CSS classes based on props
  const classes = `button ${variant} ${size}`;

  // Define the inline styles for the button
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

// PropTypes for prop validation
Button.propTypes = {
  variant: PropTypes.oneOf(["fill", "outline"]),
  size: PropTypes.oneOf(["small", "medium"]),
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  onClick: PropTypes.func,
};

// Default props for the button component
Button.defaultProps = {
  variant: "fill",
  size: "medium",
  textColor: "#ffffff", // Default text color (white)
  bgColor: "#333", // Default background color (dark gray)
};

export default Button;
