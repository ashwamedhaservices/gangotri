import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

import { Container, Stack, Typography, Button } from '@mui/material';
import { useQuizContext } from '../context/quizContextProvider';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toTitleCase } from '../../../utils/text-typecase';
import { AddQuestionAnswerToPaper } from '../components/form';
import Iconify from '../../../components/iconify';

const TestableQuestionPaperContentPaperPage = () => {
  const [paperData, setPaperData] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { fetchQuestionPaperContentById } = useQuizContext();
  const { testable_type, testable_id, paper_id } = useParams();
  const [showAdd, setShowAdd] = useState(false);
  const countApiCall = useRef(0);

  useEffect(() => {
    if(paper_id) {
      _fetchQuestionPaperContentById();
    }
  }, [paper_id]);

  useEffect(() => {
    // For Api call when closing the add 
    if(countApiCall.current > 0 && countApiCall.current % 2 === 0) {
      _fetchQuestionPaperContentById();
    }
  }, [countApiCall.current]);

  const _fetchQuestionPaperContentById = async () => {
    const data = await fetchQuestionPaperContentById(paper_id);
    setPaperData(data);
    console.log('[TestableQuestionPaperContentPaperPage]::[_fetchQuestionPaperContentById]', paper_id, data);
  }

  const togglePaperAdd = () => {
    setShowAdd(!showAdd)
    countApiCall.current = countApiCall.current + 1;
  }
  

  return (
    <>
      <Helmet>
        <title>{toTitleCase(testable_type)} papers list | Ashwamedha admin UI</title>
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
          <Button
            variant="contained"
            startIcon={!showAdd && <Iconify icon="eva:plus-fill" />} 
            onClick={togglePaperAdd}
          >{showAdd ? 'Cancel' : 'Add questions'}</Button>
        </Stack>
      </Container>

      {showAdd && <AddQuestionAnswerToPaper togglePaperAdd={togglePaperAdd} questionNo={1}/>}
    </>
  )
}

export default TestableQuestionPaperContentPaperPage;