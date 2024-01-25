import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const PayoutReport = () => {
  const [fetchedCsvData, setFetchedCsvData] = useState(null);

  const reports = [
    { name: 'Latest Payout Report', endpoint: 'payout_report.csv' },
    { name: 'Credits Report', endpoint: '' },
    { name: 'Another Report', endpoint: 'another_report_endpoint' },
    { name: 'Another Report', endpoint: 'another_report_endpoint' },
    
  ];

  const handleDownload = async (endpoint) => {
    try {
      const apiUrl = 'https://apistage.ashwamedha.net/referrals/admin/api/v1/credits/';
      const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTcsInByb2ZpbGVfaWQiOjE3fQ.txKgHinkiFfnLGpAHbO4fv183Kce_24Y9Wxqy0mf0RA';
      const headers = new Headers({
        'Authorization': `Bearer ${token}`,
      });

      const response = await fetch(`${apiUrl}/${endpoint}`, { headers });
      const csvData = await response.text();
      setFetchedCsvData(csvData);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${endpoint}-report.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error handling download:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 2 }}>
      <Typography noWrap >
        <h1>Downloadable Reports</h1>
      </Typography>

      <Stack spacing={2} direction="column" sx={{ display: 'flex' }}>
        {reports.map((report) => (
          <Typography
            key={report.endpoint}
            variant="contained"
            color="primary"
            style={{ cursor: 'pointer' }}
            onClick={() => handleDownload(report.endpoint)}
          >
            ➣ {report.name}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
};

export default PayoutReport;
