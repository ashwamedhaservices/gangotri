import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { OutlinedInput } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Table,TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';

const SearchUser = () => {
  const [userId, setUserId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isMatched, setIsMatched] = useState(false);
  const navigate = useNavigate();
  const data = [
    { userId: 1, name:'Sandesh',mobileNumber: '9900646757', email: 'sandeshrnaik2000@gmail.com', referralCode: 'ABC123' },
    
   
  ];
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
    
    if (userId === 'backendUserId' || mobileNumber === 'backendMobileNumber' || referralCode === 'backendReferralCode') {
      setIsMatched(true);
      setUserId('');
      setMobileNumber('');
      setReferralCode('');
    } else {
      setIsMatched(true);
      setUserId('');
      setMobileNumber('');
      setReferralCode('');
      
    }
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '10px' }}>
        <FormControl sx={{ m: 1, width: '30vw' }} variant="outlined">
          <h4>Enter User ID</h4>
          <OutlinedInput
            type='text'
            placeholder='Enter User ID'
            value={userId}
            onChange={handleUserIdChange}
            onKeyPress={handleEnterKeyPress}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '30vw' }} variant="outlined">
          <h4>Mobile Number</h4>
          <OutlinedInput
            type='text'
            placeholder='Enter Mobile Number'
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            onKeyPress={handleEnterKeyPress}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '30vw' }} variant="outlined">
          <h4>Referral Code</h4>
          <OutlinedInput
            type='text'
            placeholder='Enter Referral Code'
            value={referralCode}
            onChange={handleReferralCodeChange}
            onKeyPress={handleEnterKeyPress}
          />
        </FormControl>
      </div>
      {isMatched && <TableContainer sx={{margin:'5vh',width: '90%', }} >
      <Table  >
        <TableHead>
          <TableRow >
            <TableCell>User ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Mobile Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Referral Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody  onClick={()=>{navigate('/search-user/personalInfo', { replace: true })}}>
          {data.map((row) => (
            <TableRow key={row.userId} >
              <TableCell>{row.userId}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.mobileNumber}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.referralCode}</TableCell>
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
    </TableContainer> }
    
    </>
     // navigate('/search-user/personalInfo', { replace: true })
  );
}

export default SearchUser;
