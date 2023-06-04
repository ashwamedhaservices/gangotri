import { Grid, Typography } from "@mui/material";
import React from "react";
import Box from '@mui/material/Box';
import LinearProgressWithLabel from "../progress-bar";

export default function VideoInput(props) {
  const { width, height, handleVideo, percentage } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleVideo([...event.target.files])
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div className="VideoInput">
      <Grid sx={{ }}>
        <input
          ref={inputRef}
          className="VideoInput_input"
          type="file"
          onChange={handleFileChange}
          accept="video/mp4,video/x-m4v,video/*"
        />
      </Grid>
      {!source && <button onClick={handleChoose}>Upload Video</button>}
      {source && (
        <video
          className="VideoInput_video"
          width="100%"
          height={height}
          controls
          src={source}
        />
      )}
      {/* <div className="VideoInput_footer">{source || "Nothing selected"}</div> */}
      {percentage > 0 && 
        <Box sx={{ width: '100%' }}>
          <Typography variant="body2" color="text.secondary">{percentage < 100 ? 'Upload in Progress' : 'Uploaded'}</Typography>
          <LinearProgressWithLabel value={percentage} />
        </Box>
      }
    </div>
  );
}
