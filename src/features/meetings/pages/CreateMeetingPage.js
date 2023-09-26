import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  Stack,
  Paper,
  Button,
  Container,
  Typography,
  TextField,
  Grid,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

/** Date And Time picker */
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useMeetingContext } from "../context/meetingContextProvider";
import { BlogPostsSort } from "../../../sections/@dashboard/blog";
import { MEETING_PROVIDER } from "../utils/options";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CreateMeetingPage = () => {
  const { fetchMeetingsData, createMeeting } = useMeetingContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isValidUrl, setIsValidUrl] = useState(true);

  const [meetingData, setMeetingData] = useState({});

  const handleQuestionmeetingDetail = (event) => {
    setMeetingData({
      ...meetingData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log("meetingData:", meetingData);
    console.log(validateUrl(meetingData.url));
    console.log(dayjs(meetingData.start_time) < dayjs(meetingData.end_time));
    if (
      (meetingData.url && !validateUrl(meetingData.url)) ||
      (meetingData.start_time &&
        meetingData.end_time &&
        dayjs(meetingData.start_time) >= dayjs(meetingData.end_time))
    )
      return;

    await createMeeting(meetingData);
    navigate('/meeting', { replace: true });
  };
  
  const validateUrl = (inputUrl) => {
    // Regular expressions for Meet, Jitsi, and Zoom URLs
    const meetRegex = /^https:\/\/meet\.google\.com\/[a-zA-Z0-9_-]+$/;
    const jitsiRegex = /^https:\/\/meet\.jit\.si\/[a-zA-Z0-9_-]+$/;
    const zoomRegex = /^https:\/\/zoom\.us\/[a-zA-Z0-9_-]+$/;

    if (meetRegex.test(inputUrl) && meetingData.provider === "google_meet") {
      return true;
    } else if (jitsiRegex.test(inputUrl) && meetingData.provider === "jitsi") {
      return true;
    } else if (zoomRegex.test(inputUrl) && meetingData.provider === "zoom") {
      return true;
    } else {
      return false;
    }
  };

  const handleDisable = () => {
    if (
      !meetingData.name ||
      !meetingData.description ||
      !meetingData.provider ||
      !meetingData.url ||
      !meetingData.start_time ||
      !meetingData.end_time ||
      !validateUrl(meetingData.url) ||
      dayjs(meetingData.start_time) >= dayjs(meetingData.end_time)
    )
      return true;
    return false;
  };

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
            Create meeting
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Item>
              <Stack>
                {/* Question meeting title */}
                <TextField
                  label="Meeting name"
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

          <Grid item xs={12} sm={6}>
            <Item>
              <Stack>
                {/* Question meeting notes or instruction */}
                <TextField
                  label="Meeting instruction or notes"
                  name="description"
                  variant="outlined"
                  fullWidth
                  value={meetingData.description}
                  onChange={handleQuestionmeetingDetail}
                  margin="normal"
                />
              </Stack>
            </Item>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Item>
              <Stack>
                <BlogPostsSort
                  name="provider"
                  label="Meeting type"
                  value={meetingData.provider}
                  onChange={handleQuestionmeetingDetail}
                  options={MEETING_PROVIDER}
                />
              </Stack>
            </Item>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Item>
              <Stack>
                {/* Question meeting notes or instruction */}
                <TextField
                  label="Schedule meeting url"
                  name="url"
                  variant="outlined"
                  fullWidth
                  value={meetingData.url}
                  onChange={handleQuestionmeetingDetail}
                  margin="normal"
                  helperText={meetingData.provider && !validateUrl() ? `Meeting url should be from selected provider of ${meetingData.provider}` : ''}
                />
              </Stack>
            </Item>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Item>
              <Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Meeting start time"
                      name="start_time"
                      value={meetingData.start_time}
                      onChange={(value) =>
                        setMeetingData({
                          ...meetingData,
                          start_time: dayjs(value).toISOString(),
                        })
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {meetingData.start_time && meetingData.end_time && dayjs(meetingData.start_time) >= dayjs(meetingData.end_time) && 'Meeting start time should be less then end time.'}
              </Stack>
            </Item>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Item>
              <Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Meeting end time"
                      name="end_time"
                      value={meetingData.end_time}
                      onChange={(value) =>
                        setMeetingData({
                          ...meetingData,
                          end_time: dayjs(value).toISOString(),
                        })
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {meetingData.start_time && meetingData.end_time && dayjs(meetingData.start_time) >= dayjs(meetingData.end_time) && 'Meeting start time should be less then end time.'}
              </Stack>
            </Item>
          </Grid>
        </Grid>

        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          sx={{ mt: "1rem" }}
          onClick={handleSubmit}
          disabled={handleDisable()}
        >
          Create meeting
        </LoadingButton>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
          mb={1}
        >
          <Typography variant="h6" gutterBottom>
            Meeting Can be schedule here and url can be pasted above
          </Typography>
        </Stack>

        <Grid container>
          <Grid item>
            <Stack>
              {MEETING_PROVIDER &&
                MEETING_PROVIDER.map(
                  (provider) =>
                    provider &&
                    provider.website && (
                      <Link
                        key={provider.value}
                        target="_blank"
                        variant="body2"
                        href={provider.website}
                        underline="hover"
                      >
                        {provider.label}: {provider.website}
                      </Link>
                    )
                )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CreateMeetingPage;
