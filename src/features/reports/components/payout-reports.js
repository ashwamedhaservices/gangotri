import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { usePayoutContext } from '../context/PayoutContextProvider';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  maxWidth: 400,
}));

const PayoutReport = () => {
 // const { fetchPayoutReport } = usePayoutContext();

 // const handleDownload = async () => {
   // try {
      // Fetch payout report data
   //   const fetchedCsvData = await fetchPayoutReport();

      // Download the CSV file
      const fetchedCsvData=null;
      const handleDownload =  () => {
      const blob = new Blob([fetchedCsvData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'payout-report.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
   // } catch (error) {
      //console.error('Error handling download:', error);
    //}
  };

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <Typography noWrap sx={{ textAlign: 'center' }}><h1>Reports</h1></Typography>
      <Item
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            color="error"
            style={{ padding: '10px', cursor: 'pointer' }}
            onClick={handleDownload}
          >
            Download Payout Report
          </Button>
        </Stack>
      </Item>
    </Box>
  );
};

export default PayoutReport;
