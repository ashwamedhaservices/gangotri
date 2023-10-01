import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { Container, Stack, Typography, Button } from '@mui/material';
import { useQuizContext } from '../context/quizContextProvider';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toTitleCase } from '../../../utils/text-typecase';

const TestableQuestionPaperContentPaperPage = () => {
  const [paperData, setPaperData] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { fetchQuestionPaperContentById } = useQuizContext();
  const { testable_type, testable_id, paper_id } = useParams();

  useEffect(() => {
    if(paper_id) {
      _fetchQuestionPaperContentById()
    }
  }, [paper_id]);

  const _fetchQuestionPaperContentById = async () => {
    const data = await fetchQuestionPaperContentById(paper_id);
    setPaperData(data);
    console.log('[TestableQuestionPaperContentPaperPage]::[_fetchQuestionPaperContentById]', paper_id, data);
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
        </Stack>

        <div>PaperID</div>
      </Container>
    </>
  )
}

export default TestableQuestionPaperContentPaperPage;