import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  AppBar,
  TextField,
  Button,
  MenuItem,
  Toolbar,
  IconButton,
  Typography,
  Container,
} from "@mui/material";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import {
  getAccountsKyc,
  getAccountsOnboarding
} from "../../../service/ash_admin";
import { accountNoValidation, ifscValidation } from "../../../utils/validations";
import { KycBankContext } from "../../../context/bank/kycBankContextProvider";

const Bank = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { fetchBankByIdForAdminData, updateKycBank } = useContext(KycBankContext)
  const [bankData, setBankData] = useState({
    account_number: "",
    account_type: "",
    ifsc: "",
  });
  const [accountNoError, setAccountNoError] = useState("");
  const [ifscError, setIfscError] = useState("");

  useEffect(() => {
    const bankId = searchParams.get('id');
    if(bankId) {
      _fetchKycBankData(bankId);
    }
  }, []);

  const _fetchKycBankData = async (bankId) => {
    const bank = await fetchBankByIdForAdminData(bankId);
    setBankData(() => ({
      ...bank
    }))
  }

  const _updateKycBank = async () => {
    await updateKycBank(bankData);
    navigate('/onboarding', {replace: true});
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBankData((prevData) => ({ ...prevData, [name]: value }));
  };

  const _accountNoValidation = (value) => {
    const error = accountNoValidation(value);
    setAccountNoError(error);
  };

  const _ifscValidation = (value) => {
    const error = ifscValidation(value);
    setIfscError(error);
  };

  const handleBankSubmit = async () => {
    console.log(bankData);
    _accountNoValidation(bankData.account_number);
    if (accountNoError) {
      return;
    }
    _ifscValidation(bankData.ifsc);
    if (ifscError) {
      return;
    }

    if(bankData && bankData.id) {
      await _updateKycBank();
      return
    }
  }

  const buttonDisabled = () => {
    return (
      bankData &&
      (!bankData.account_number || !bankData.account_type || !bankData.ifsc)
    );
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{
          backgroundColor: "var(--theme-background-secondary)",
          elevation: 0,
        }}
      >
        <Toolbar>
          <IconButton onClick={() => navigate("/onboarding", { replace: true })}>
            <ArrowBackSharpIcon
              color="primary"
              style={{ color: "var(--theme-primary-navbar-color)" }}
            />
          </IconButton>
          <Typography
            variant="h6"
            color="primary"
            style={{ color: "var(--theme-primary-navbar-color)" }}
          >
            Bank details
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ padding: "16px", marginTop: "32px" }}>
        <TextField
          label="Enter account number"
          type="number"
          name="account_number"
          value={bankData.account_number}
          onChange={handleInputChange}
          error={Boolean(accountNoError)}
          helperText={accountNoError}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Account type"
          name="account_type"
          select
          value={bankData.account_type}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="savings">Savings</MenuItem>
          <MenuItem value="current">Current</MenuItem>
        </TextField>

        <TextField
          label="Enter IFSC code"
          type="text"
          name="ifsc"
          value={bankData.ifsc}
          onChange={handleInputChange}
          error={Boolean(ifscError)}
          helperText={ifscError}
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          style={{
            marginTop: "16px",
            color: `${
              buttonDisabled() ? "white" : "var(--theme-background-tertiary)"
            }`,
            backgroundColor: `${
              buttonDisabled()
                ? "var(--theme-background-tertiary)"
                : "var(--theme-primary-color)"
            }`,
          }}
          onClick={handleBankSubmit}
          disabled={buttonDisabled()}
        >
          {bankData && bankData.id ? 'Update' : 'Continue'}
        </Button>
      </Container>
    </div>
  );
};

export default Bank;
