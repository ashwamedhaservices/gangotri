import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as XLSX from 'xlsx';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const DragAndDropBox = styled('div')({
  border: '2px dashed #c8c8c8',
  borderRadius: '4px',
  padding: '32px',
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  maxHeight: '100px',
  overflow: 'auto',
  wordWrap: 'break-word',
});

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
  const [jsonData, setJsonData] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleFileChange = (file) => {
    setSelectedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const convertedData = XLSX.utils.sheet_to_json(sheet);
        const updatedData = convertedData.map(user => ({ ...user, credit_type: 'partner' }));
        setJsonData(updatedData);
        setShowAlert(true); 
      } catch (error) {
        console.error('Error converting Excel to JSON:', error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowAlert(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://apistage.ashwamedha.net/referrals/admin/api/v1/credits/bulk_credit_update.json';

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTcsInByb2ZpbGVfaWQiOjE3fQ.txKgHinkiFfnLGpAHbO4fv183Kce_24Y9Wxqy0mf0RA',
      };

      if (jsonData) {
        const data = {
          payouts: jsonData,
        };

        try {
          const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();
          console.log(responseData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [jsonData]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '60vh',
      }}
    >
      <Paper elevation={3} sx={{ width: '50%', padding: 2, textAlign: 'center' }}>
        <h2>UPLOAD A FILE</h2>
        <DragAndDropBox onDragOver={handleDragOver} onDrop={handleDrop}>
          <p>{selectedFileName || 'Drag and drop your file here'}</p>
        </DragAndDropBox>
        <p style={{ margin: '10px 0' }}>or</p>
        <div style={{ marginTop: '10px' }}>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            UPLOAD FILE
            <VisuallyHiddenInput type="file" onChange={handleSelectFile} />
          </Button>
        </div>
      </Paper>

      
      <Snackbar
        open={showAlert}
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseAlert}
          severity="success"
        >
          File uploaded successfully!
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
