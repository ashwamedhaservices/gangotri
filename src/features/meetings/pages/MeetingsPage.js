import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Button } from '@mui/material';
import { useMeetingContext } from '../context/meetingContextProvider';
import MeetingTable from '../components/meeting-table/MeetingTable';
import Iconify from "../../../components/iconify";

const MeetingsPage = () => {
  const navigate = useNavigate();
  const { fetchMeetingsData } = useMeetingContext();
  const [meetingsList, setMeetingsList] = useState([]);

  useEffect(() => {
    _fetchMeetingsData();
  }, []);

  const _fetchMeetingsData = async () => {
    const data = await fetchMeetingsData();
    setMeetingsList(data);
    console.log('[MeetingPage]::[_fetchMeetingsData]::', data);
  }

  return (
    <>
      <Helmet>
        <title> Meeting | Ashwamedha admin UI </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            All meetings
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate(`/meeting/create-meeting`, { replace: false })}
          >
            Create meeting
          </Button>
        </Stack>

        {
          meetingsList && meetingsList.length > 0 ? <MeetingTable meetings={meetingsList}/> : <Typography variant="body2" gutterBottom>
          Meeting List is Empty
        </Typography>
        }
      </Container>
    </>
  )
}

export default MeetingsPage