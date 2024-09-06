import ReactPlayer from "react-player";
import PropTypes from "prop-types";

export const VideoPlayer = ({
  url,
  controls,
  playing,
  loop,
  width,
  height,
  volume,
  muted,
}) => {
  return (
    <div>
      <ReactPlayer
        url={url}
        controls={controls}
        playing={playing}
        loop={loop}
        width={width}
        height={height}
        volume={volume}
        muted={muted}
      />
    </div>
  );
};

// PropTypes validation
VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired, // URL is required and must be a string
  controls: PropTypes.bool, // Boolean to show/hide controls
  playing: PropTypes.bool, // Boolean to play the video automatically
  loop: PropTypes.bool, // Boolean to loop the video
  width: PropTypes.string, // Width of the player (e.g., "100%" or "600px")
  height: PropTypes.string, // Height of the player (e.g., "400px")
  volume: PropTypes.number, // Volume of the player (between 0 and 1)
  muted: PropTypes.bool, // Boolean to mute the player
};

// Default Props
VideoPlayer.defaultProps = {
  controls: false,
  playing: true,
  loop: false,
  width: "100%",
  height: "50%",
  volume: 0.8,
  muted: true,
};
