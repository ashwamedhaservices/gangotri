import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { 
  Stack,
  Paper,
  Button,
  Container,
  Typography,
  TextField,
  Grid, 
} from '@mui/material';
import { styled } from "@mui/material/styles";
import { LoadingButton } from '@mui/lab';

import { useNavigate, useSearchParams } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CreateMeetingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [meetingData, setmeetingData] = useState({});

  const handleQuestionmeetingDetail = (event) => {
    setmeetingData({
      ...meetingData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log("meetingData:", meetingData);
    
  };

  const handleDisable = () => {
    if(!meetingData.name || !meetingData.notes || !meetingData.testable_type || !meetingData.testable_id) return true
    return false
  }

  return (
    <>
      <Helmet>
        <title> Meeting | Ashwamedha admin UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Question meeting
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid item sx={12} sm={6}>
            <Item>
              <Stack>
                { /* Question meeting title */ }
                <TextField
                  label="meeting title"
                  name="name"
                  variant="outlined"
                  fullWidth
                  value={meetingData.name}
                  onChange={handleQuestionmeetingDetail}
                  margin="normal"
                />
              </Stack>
            </Item>
          </Grid>

          <Grid item sx={12} sm={6}>
            <Item>
              <Stack>
                { /* Question meeting notes or instruction */ }
                <TextField
                  label="meeting instruction or notes"
                  name="notes"
                  variant="outlined"
                  fullWidth
                  value={meetingData.notes}
                  onChange={handleQuestionmeetingDetail}
                  margin="normal"
                />
              </Stack>
            </Item>
          </Grid>

          <Grid item sx={12} sm={6}>
            <Item>
              <Stack>
                
              </Stack>
            </Item>
          </Grid>

          <Grid item sx={12} sm={6}>
            <Item>
              <Stack>
                
              </Stack>
            </Item>
          </Grid>
        </Grid>

        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          sx={{ mt: '1rem'}}
          onClick={handleSubmit}
          disabled={handleDisable()}
        >
          Create meeting
        </LoadingButton>
      </Container>
    </>
  )
}

export default CreateMeetingPage;