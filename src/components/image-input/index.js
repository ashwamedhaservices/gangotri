// import { DropzoneArea } from "material-ui-dropzone";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LinearProgressWithLabel from "../progress-bar";

// const ImageInput = () => {
//   const [files, setFiles] = useState([]);
//   const handleImageInput = (uploaded_files) => {
//     setFiles(uploaded_files)
//     console.log('Image Files: ', uploaded_files)
//   }
//   return (
//     <DropzoneArea
//       acceptedFiles={['.jpeg', '.png', '.svg']}
//       maxFileSize={5000000}
//       onChange={handleImageInput} 
//     />
//   )
// }
const CustomBox = styled(Box)({
  '&.MuiBox-root': {
    backgroundColor: '#fff',
    borderRadius: '2rem',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    padding: '1rem',
  },
  '&.MuiBox-root:hover, &.MuiBox-root.dragover': {
    opacity: 0.6,
  },
});
const ImageInput = ({
  limit, 
  multiple, 
  name,
  handleImage,
  percentage,
}) => {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if(images.length < 1) return
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls)
  }, [images]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
    handleImage([...e.target.files]);
  }
  const calcSize = (size) => {
    return size < 1000000
      ? `${Math.floor(size / 1000)} KB`
      : `${Math.floor(size / 1000000)} MB`;
  };

  return (
    <>
      <input 
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
      />
      {
      imageURLs.map((imageSrc, index) => 
          <Box sx={{ mt: 2, display: 'flex', }} key={index}>
            <img 
              src={imageSrc} 
              height="100px" 
              width="150px" 
              alt="upload"
            />
            <Box sx={{ ml: 1 }}>
              <Typography>{imageSrc.name}</Typography>
            </Box>
          </Box>
        ) 
      }
      {percentage > 0 && 
        <Box sx={{ width: '100%' }}>
          <Typography variant="body2" color="text.secondary">{percentage < 100 ? 'Upload in Progress' : 'Uploaded'}</Typography>
          <LinearProgressWithLabel value={percentage} />
        </Box>
      }
    </>
  )
}
export default ImageInput
