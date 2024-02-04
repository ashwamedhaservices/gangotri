import React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Reports = () => {
  const navigate = useNavigate();
  return (
    <>
      <Typography 
        variant="h6"
        style={{ margin: '10px', cursor: 'pointer',color:'blue' ,marginLeft:'20px'}}
        onClick={() =>
          navigate('/reports/payout-report')
        }
      >
       ➣ Payout Reports
      </Typography>
      <Typography 
        variant="h6"
        style={{ margin: '10px', cursor: 'pointer',color:'blue' ,marginLeft:'20px'}}
        onClick={() =>
          navigate('/reports/uploadPayout')
        }
      >
       ➣ Upload Payout
      </Typography>
    </>
  );
}

export default Reports;
