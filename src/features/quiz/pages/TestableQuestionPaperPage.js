import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Button } from '@mui/material';
import { useQuizContext } from '../context/quizContextProvider';
import { TestableList } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
import { toTitleCase } from '../../../utils/text-typecase';


const TestableQuestionPaperPage = () => {
  const [questionPapers, setQuestionPapers] = useState();
  const navigate = useNavigate();
  const { fetchAllQuestionPapers } = useQuizContext();
  const { testable_type, testable_id } = useParams();
  useEffect(() => {
    _fetchAllQuestionPapers();
  }, []);

  const _fetchAllQuestionPapers = async () => {
    const data = await fetchAllQuestionPapers({testable_type, testable_id});
    setQuestionPapers(data);
    console.log('[TestableQuestionPaperPage]::[_fetchAllQuestionPapers]::', data);
  }

  const handleEditPaper = () => {
    // For Edit the Question paper
    navigate();
  }

  const handleViewPaper = () => {
    // For the question paper visibility with all the questions and answer added to the paper
  }

  return (
    <>
      <Helmet>
        <title> {toTitleCase(testable_type)} papers list | Ashwamedha admin UI </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Selected {testable_type} papers
          </Typography>
        </Stack>

        {
          questionPapers && questionPapers.length > 0 ? <TestableList papers={questionPapers} handleEdit={handleEditPaper} handleView={handleViewPaper}/> : <Typography variant="body2" gutterBottom>
          Paper List is Empty
        </Typography>
        }
      </Container>
    </>
  )
}

export default TestableQuestionPaperPage