import { useContext, useEffect, useState } from 'react';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { isValidEmail, isValidPassword, isValidUserName } from '../../../utils/validations';
import { AuthContext } from '../../../context/authentication/authContextProvider';

// ----------------------------------------------------------------------

export default function LoginForm() {

  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext)
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    setMobileError('');
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login validation here
    if(!validate()) return
    login({
      mobile_number: mobile,
      email,
      username: email.split('@')[0],
      password
    })
  };

  const validate = () => {
    let isValid = true;
    console.log('validate...')
    // if (!email.includes('@') || !email.includes('.')) {
    //   setEmailError('Please enter a valid email address.');
    //   isValid = false;
    // }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    // if(!isValidEmail(email) && !isValidUserName(email)) {
    //   setEmailError('Please enter a valid email address or username.');
    //   isValid = false
    // }

    if(!isValidPassword) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false
    }
    if(isValid) {
      setEmailError('')
      setPasswordError('')
    }
    return isValid;
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          autoFocus
          name="mobile_number" 
          label="Mobile number" 
          value={mobile}
          onChange={handleMobileChange}
          // error={emailError ? true : false}
          // helperText={emailError ? emailError : ''}
        />
        {/* <TextField
          autoFocus
          name="email" 
          label="Email address" 
          value={email}
          onChange={handleEmailChange}
          error={emailError ? true : false}
          helperText={emailError ? emailError : ''}
        /> */}

        <TextField
          autoFocus
          name="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError ? true : false}
          helperText={passwordError ? passwordError : ''}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
        Login
      </LoadingButton>
    </>
  );
}
