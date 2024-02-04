import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import { OutlinedInput, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const SearchUser = () => {
  const [userId, setUserId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isMatched, setIsMatched] = useState(false);
  const [userData, setUserData] = useState([]);
  const [matchedUser, setMatchedUser] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://apistage.ashwamedha.net/staging/accounts/admin/api/v1/users.json',
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIsInByb2ZpbGVfaWQiOjEyfQ.KXMZMWfmnMPDbWhF9ale1XyfEdJAYI5mpY7P4Br_DpM',
            },
          }
        );
        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleReferralCodeChange = (event) => {
    setReferralCode(event.target.value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleEnterClick();
    }
  };

  const handleEnterClick = () => {
    const user = userData.find((user) => {
      return (
        user.id === parseInt(userId) ||
        user.mobile_number === mobileNumber ||
        user.referral_code === referralCode
      );
    });

    if (user) {
      setIsMatched(true);
      setMatchedUser(user);
    } else {
      setIsMatched(false);
      setMatchedUser(null);
      setAlertOpen(true);
    }

    setUserId('');
    setMobileNumber('');
    setReferralCode('');
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '10px' }}>
        <FormControl sx={{ m: 1, width: '30vw' }} variant="outlined">
          <h4>Enter User ID</h4>
          <OutlinedInput
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={handleUserIdChange}
            onKeyPress={handleEnterKeyPress}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '30vw' }} variant="outlined">
          <h4>Mobile Number</h4>
          <OutlinedInput
            type="text"
            placeholder="Enter Mobile Number"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            onKeyPress={handleEnterKeyPress}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '30vw' }} variant="outlined">
          <h4>Referral Code</h4>
          <OutlinedInput
            type="text"
            placeholder="Enter Referral Code"
            value={referralCode}
            onChange={handleReferralCodeChange}
            onKeyPress={handleEnterKeyPress}
          />
        </FormControl>
      </div>
      {isMatched && matchedUser && (
        <>
          <TableContainer sx={{ margin: '5vh', width: '90%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Referral Code</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                onClick={() =>
                  navigate('/search-user/personalInfo', { state: { user: matchedUser } })
                }
              >
                <TableRow>
                  <TableCell>{matchedUser.id}</TableCell>
                  <TableCell>{`${matchedUser.fname} ${matchedUser.lname}`}</TableCell>
                  <TableCell>{matchedUser.mobile_number}</TableCell>
                  <TableCell>{matchedUser.email}</TableCell>
                  <TableCell>{matchedUser.referral_code}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
          User not found!
        </Alert>
      </Snackbar>
    </>
  );
};

export default SearchUser;
