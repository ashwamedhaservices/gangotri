import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Stack, Typography } from '@mui/material'
import { useKycContext } from '../../../context/kyc/kycContextProvider';
import CollapsibleKycedTable from '../../../components/kyced-table';

const OnboardingPage = () => {
  const { fetchAllKycData } = useKycContext();
  const [kycedUsers, setKycedUsers] = useState([]);

  useEffect(() => {
    _fetchAllKycs();
  }, [])

  const _fetchAllKycs = async () => {
    const data = await fetchAllKycData();
    setKycedUsers(data);
    console.log('Onboarding Page', data);
  }
  return (
    <>
      <Helmet>
        <title> Onboarding | Ashwamedha admin UI </title>
      </Helmet>
      
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            All Kycs
          </Typography>
        </Stack>
        
        { kycedUsers && kycedUsers.length > 0 ?  <CollapsibleKycedTable kycs={kycedUsers} /> :
          <Typography variant="body2" gutterBottom>
            Kyc List is Empty
          </Typography>
        }
      </Container>
    </>
  )
}

export default OnboardingPage