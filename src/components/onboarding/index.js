import { useState } from "react";
import { createSearchParams, Outlet, useSearchParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import {
  getAccountsKyc,
  getAccountsKycedAddress,
  getAccountsKycedBank,
  getAccountsKycedNominees,
  getAccountsOnboarding,
} from "../../service/ash_admin";
import { useEffect } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import ImageInput from "../image-input";

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
  flexDirection: "column",
});

const BOTTOM_BAR_MOBILE = 95;
const TOP_BAR_DESKTOP = 60;

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingBottom: BOTTOM_BAR_MOBILE + 24,
  [theme.breakpoints.up["md"]]: {
    paddingTop: 0,
  },
  [theme.breakpoints.up("md")]: {
    paddingTop: TOP_BAR_DESKTOP,
    paddingBottom: 0,
  },
  backgroundColor: "var(--theme-background)",
}));

const Onboarding = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [isKyced, setIsKyced] = useState(false);
  const [kyc, setKyc] = useState({});
  const [bank, setBank] = useState([]);
  const [nominee, setNominee] = useState([]);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    if (!isKyced) {
      _fetchOnboardingStatus();
    } else {
      fetchAllData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isKyced, searchParams]);

  const fetchAllData = async () => {
    fetchKycData();
    fetchBankData();
    fetchAddressData();
    fetchNomineeData();
  };

  const _fetchOnboardingStatus = async () => {
    try {
      console.log("[KycPage]::[_fetchOnboardingStatus]");
      const onboarding = await getAccountsOnboarding();

      const flow = onboarding["flow"];

      const pages = flow.filter((page) => !page["status"]);
      console.log(pages);

      if (!onboarding["status"]) {
        // Not Kyced
        const path = `/kyc/${pages && pages[0]["page"]}`;
        console.log(path);
        navigate(path, { replace: true });
      } else {
        setIsKyced(onboarding["status"]);
      }

      console.log(`[KycPage]::[_fetchOnboardingStatus]`, pages, onboarding);
    } catch (err) {
      console.log(`[KycPage]::[_fetchOnboardingStatus]::err ${err}`);
    }
  };

  const fetchKycData = async () => {
    try {
      const data = await getAccountsKyc();
      console.log("[fetchKycData]::res", data);
      setKyc(data);
    } catch (error) {
      console.error("[fetchKycData]::err", error);
    }
  };

  const fetchBankData = async () => {
    try {
      const data = await getAccountsKycedBank();
      console.log("[fetchBankData]::res", data);
      setBank(data);
    } catch (error) {
      console.error("[fetchBankData]::err", error);
    }
  };

  const fetchAddressData = async () => {
    try {
      const data = await getAccountsKycedAddress();
      console.log("[fetchAddressData]::res", data);
      setAddress(data);
    } catch (error) {
      console.error("[fetchAddressData]::err", error);
    }
  };

  const fetchNomineeData = async () => {
    try {
      const data = await getAccountsKycedNominees();
      console.log("[fetchNomineeData]::res", data);
      setNominee(data);
    } catch (error) {
      console.error("[fetchNomineeData]::err", error);
    }
  };

  const handleNavigate = (pathname, params) => {
    navigate({
      pathname,
      search: `?${createSearchParams(params)}`,
    }, { replace: true });
  }

  const handleKycClick = (kyc) => {
    handleNavigate('/kyc/pan', { id: kyc.id });
  }

  const handleKycImageClick = (kyc) => {
    handleNavigate('/kyc/pan-upload', { id: kyc.id });
  }

  const handleBankClick = (bank) => {
    handleNavigate('/kyc/bank', { id: bank.id });
  }

  const handleNomineeClick = (nominee) => {
    handleNavigate('/kyc/nominee', { id: nominee.id });
  }

  const handleAddressClick = (address) => {
    handleNavigate('/kyc/address', { id: address.id });
  }

  const handleAddressProofImageClick = () => {
    handleNavigate('/kyc/address-proof-upload', { id: kyc.id });
  } 

  return (
    <StyledRoot>
      {location && location.pathname && location.pathname === "/kyc" ? (
        <Container>
          {kyc && <KycCard kyc={kyc} handleClick={handleKycClick}/>}
          {kyc && <KycImageCard kyc={kyc} handleClick={handleKycImageClick}/>}
          {bank && <BankCard banks={bank} handleClick={handleBankClick}/>}
          {nominee && <NomineeCard nominees={nominee} handleClick={handleNomineeClick}/>}
          {address && <AddressCard addresses={address} handleClick={handleAddressClick}/>}
          {address && <AddressProofImageCard kyc={kyc} handleClick={handleAddressProofImageClick}/>}
        </Container>
      ) : (
        <Main>
          <Outlet />
        </Main>
      )}
    </StyledRoot>
  );
};

const CardHeading = ({ heading }) => {
  return (
    <Typography style={{ color: "var(--theme-primary-navbar-color)" }} className="k-pt32 k-ml16 k-mb16 theme__typography--primary theme__fw--primary">
      {heading}
    </Typography>
  );
};

const ItemWithTitleSubtitle = ({ title, subtitle }) => {
  return (
    <>
      <Typography className="theme__typography--primary theme__palette--secondary theme__typography--secondary">
        {title}
      </Typography>
      <Typography className="theme__typography--primary theme__palette--tertiary theme__fw--primary">
        {subtitle}
      </Typography>
    </>
  );
};

const NomineeCard = ({ nominees, handleClick }) => {
  return (
    <>
      <CardHeading heading="Nominee details" />
      {nominees &&
        nominees.map((nominee) => (
          <Grid
            key={nominee.name}
            container
            spacing={2}
            className="card-with-background"
            sx={{ m: 2, width: "calc(100% - 32px)" }}
            onClick={() => handleClick(nominee)}
          >
            <Grid item xs={12} sx={{ p: 1 }}>
              <ItemWithTitleSubtitle title="Name" subtitle={nominee.name} />
            </Grid>
            <Grid item xs={6} sm={4} md={3} sx={{ p: 1 }}>
              <ItemWithTitleSubtitle title="DOB" subtitle={nominee.dob} />
            </Grid>
            <Grid item xs={6} sm={4} md={3} sx={{ p: 1 }}>
              <ItemWithTitleSubtitle
                title="Relationship"
                subtitle={nominee.relationship}
              />
            </Grid>
          </Grid>
        ))}
    </>
  );
};

const BankCard = ({ banks, handleClick }) => {
  const maskAccountNumber = (value) => {
    return "**** **** " + value.slice(value.length - 3);
  };
  return (
    <>
      <CardHeading heading="Bank account details" />
      {banks &&
        banks.map((bank) => (
          <Grid
            container
            spacing={2}
            className="card-with-background"
            sx={{ m: 2, width: "calc(100% - 32px)" }}
            onClick={() => handleClick(bank)}
          >
            <Grid item xs={12} sx={{ p: 1 }}>
              <ItemWithTitleSubtitle
                title="A/c number"
                subtitle={maskAccountNumber(bank.account_number)}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={3} sx={{ p: 1 }}>
              <ItemWithTitleSubtitle
                title="Type"
                subtitle={bank.account_type}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={3} sx={{ p: 1 }}>
              <ItemWithTitleSubtitle title="IFSC" subtitle={bank.ifsc} />
            </Grid>
            {bank.city && (
              <Grid item xs={6} sm={4} md={3} sx={{ p: 1 }}>
                <ItemWithTitleSubtitle title="City" subtitle={bank.city} />
              </Grid>
            )}
          </Grid>
        ))}
    </>
  );
};

const AddressCard = ({ addresses, handleClick }) => {
  const fullAddress = ({
    name,
    address_line_one,
    address_line_two,
    address_line_three
  }) => {
    const addressD = [name, address_line_one,
      address_line_two,
      address_line_three].filter((d) => d);
    return addressD.join(', ') 
  }
  return (
    <>
      <CardHeading heading="Address details" />
      {addresses &&
        addresses.map((address) => (
          <Grid
            key={address.name}
            container
            spacing={2}
            className="card-with-background"
            sx={{ m: 2, width: "calc(100% - 32px)" }}
            onClick={() => handleClick(address)}
          >
            <Grid item xs={12} sx={{ p: 1 }}>
              <ItemWithTitleSubtitle title="Address" subtitle={fullAddress(address)} />
            </Grid>
            <Grid item xs={4} sm={4} md={3} sx={{ p: 1 }}>
              <ItemWithTitleSubtitle
                title="Address type"
                subtitle={address.address_type}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={3} sx={{ p: 1 }}>
              <ItemWithTitleSubtitle title="City" subtitle={address.city} />
            </Grid>
            <Grid item xs={4} sm={4} md={3} sx={{ p: 1 }}>
              <ItemWithTitleSubtitle
                title="State"
                subtitle={address.state}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={3} sx={{ p: 1 }}>
              <ItemWithTitleSubtitle
                title="Country"
                subtitle={address.country}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={3} sx={{ p: 1 }}>
              <ItemWithTitleSubtitle
                title="Postal Code"
                subtitle={address.postal_code}
              />
            </Grid>
          </Grid>
        ))}
    </>
  );
};

const KycCard = ({ kyc, handleClick }) => {
  return (
    <>
      <CardHeading heading="Information as per kyc" />
      {kyc &&
          <Grid
            container
            spacing={2}
            className="card-with-background"
            sx={{ m: 2, width: "calc(100% - 32px)" }}
            onClick={() => handleClick(kyc)}
          >
            <Grid item xs={12} sx={{ p: 1 }}>
              <ItemWithTitleSubtitle title="Name of Kyced person" subtitle={kyc.name} />
            </Grid>
            <Grid item xs={6} sm={4} md={3} sx={{ p: 1 }}>
              <ItemWithTitleSubtitle title="Id proof type" subtitle={kyc.id_proof_type} />
            </Grid>
            <Grid item xs={6} sm={4} md={3} sx={{ p: 1 }}>
              <ItemWithTitleSubtitle title="Id proof number" subtitle={kyc.id_proof_no} />
            </Grid>
          </Grid>
        }
    </>
  );
};

const KycImageCard = ({ kyc, handleClick }) => {
  return (
    <>
      <CardHeading heading="Uploaded pan" />
      {kyc &&
          <Grid
            container
            spacing={2}
            className="card-with-background"
            sx={{ m: 2, width: "calc(100% - 32px)" }}
            
          >
            <Grid item xs={12} sx={{ p: 1 }}>
              <img 
                src={kyc.id_proof_url} 
                height="200px" 
                width="100%" 
                alt="upload"
              />
            </Grid>
            <Grid item xs={6} sm={4} md={3} sx={{ p: 1 }}>
            <Button
              variant="contained"
              color="primary"
              className="theme__palette--primary"
              style={{ backgroundColor: 'var(--theme-background-tertiary)' }}
              onClick={() => handleClick(kyc)}
            >
              Re Upload
            </Button>
            </Grid>
          </Grid>
        }
    </>
  );
};

const AddressProofImageCard = ({ kyc, handleClick }) => {
  return (
    <>
      <CardHeading heading="Address proof" />
      {kyc &&
          <Grid
            container
            spacing={2}
            className="card-with-background"
            sx={{ m: 2, width: "calc(100% - 32px)" }}
            
          >
            <Grid item xs={12} sx={{ p: 1 }}>
              <img 
                src={kyc.address_proof_url} 
                height="200px" 
                width="100%" 
                alt="upload"
              />
            </Grid>
            <Grid item xs={6} sm={4} md={3} sx={{ p: 1 }}>
            <Button
              variant="contained"
              color="primary"
              className="theme__palette--primary"
              style={{ backgroundColor: 'var(--theme-background-tertiary)' }}
              onClick={() => handleClick(kyc)}
            >
              Re Upload
            </Button>
            </Grid>
          </Grid>
        }
    </>
  );
};

export default Onboarding;
