import PropTypes from "prop-types";

export default function LoadingSpinner({ color = "#00D2F9", width = "10vw" }) {
  return (
    <output
      aria-label="Loading"
      style={{
        width,
        aspectRatio: "1",
        border: `4px solid ${color}`,
        borderRightColor: "transparent",
        borderRadius: "50%",
        animation: "zcaa-spin 0.8s linear infinite",
      }}
    >
      <style jsx>{`
        @keyframes zcaa-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </output>
  );
}

LoadingSpinner.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
};
