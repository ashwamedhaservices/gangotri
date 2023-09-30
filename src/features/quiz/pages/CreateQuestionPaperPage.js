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

import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useQuizContext } from '../context/quizContextProvider';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CreateQuestionPaperPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { createQuestionPaper } = useQuizContext();
  const { testable_type, testable_id } = useParams();
  const [paperData, setPaperData] = useState({
    name: '', 
    notes: '',
  });

  useEffect(() => {
    setPaperData(() => ({
      ...paperData,
      testable_type, 
      testable_id
    }))
  }, [testable_type, testable_id])

  const handleQuestionPaperDetail = (event) => {
    setPaperData({
      ...paperData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log("paperData:", paperData);
    await createQuestionPaper(paperData);
    navigate(`/paper/${paperData.testable_type}/${paperData.testable_id}/testable`, { replace: false });
    setPaperData({
      name: '', 
      notes: '',
    })
  };

  const handleDisable = () => {
    if(!paperData.name || !paperData.notes || !paperData.testable_type || !paperData.testable_id) return true
    return false
  }

  return (
    <>
      <Helmet>
        <title> Question | Ashwamedha admin UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Question paper {testable_type} {testable_id}
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Item>
              <Stack>
                { /* Question paper title */ }
                <TextField
                  label="Paper title"
                  name="name"
                  variant="outlined"
                  fullWidth
                  value={paperData.name}
                  onChange={handleQuestionPaperDetail}
                  margin="normal"
                />
              </Stack>
            </Item>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Item>
              <Stack>
                { /* Question paper notes or instruction */ }
                <TextField
                  label="Paper instruction or notes"
                  name="notes"
                  variant="outlined"
                  fullWidth
                  value={paperData.notes}
                  onChange={handleQuestionPaperDetail}
                  margin="normal"
                />
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
          Create paper
        </LoadingButton>
      </Container>
    </>
  )
}

export default CreateQuestionPaperPage;