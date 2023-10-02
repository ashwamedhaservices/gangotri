import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

import { Container, Stack, Typography, Button } from '@mui/material';
import { useQuizContext } from '../context/quizContextProvider';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toTitleCase } from '../../../utils/text-typecase';
import { AddQuestionAnswerToPaper } from '../components/form';
import Iconify from '../../../components/iconify';
import { PaperContent } from '../components';

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

  const response = {
    "1": {
        "id": 3,
        "value": "what is life",
        "question_type": "mcq",
        "answers": [
            {
                "id": 5,
                "value": "its bad",
                "correct": true,
                "explanation": "kya karega"
            },
            {
                "id": 6,
                "value": "its bad ok",
                "correct": false,
                "explanation": "kya karega"
            }
        ]
    },
    "2": {
        "id": 4,
        "value": "what is life",
        "question_type": "mcq",
        "answers": [
            {
                "id": 7,
                "value": "its bad",
                "correct": true,
                "explanation": "kya karega"
            },
            {
                "id": 8,
                "value": "its bad ok",
                "correct": false,
                "explanation": "kya karega"
            }
        ]
    },
    "3": {
        "id": 2,
        "value": "Define is matter?",
        "question_type": "mcq",
        "answers": [
            {
                "id": 1,
                "value": "matter nahi karta",
                "correct": false,
                "explanation": null
            },
            {
                "id": 2,
                "value": "bekar ki cheese",
                "correct": false,
                "explanation": null
            },
            {
                "id": 3,
                "value": "tujhe kya",
                "correct": false,
                "explanation": null
            },
            {
                "id": 4,
                "value": "everything around us",
                "correct": true,
                "explanation": "ab sahi hai to mai kya karu"
            }
        ]
    },
    "4": {
        "id": 14,
        "value": "What is matter",
        "question_type": "mcq",
        "answers": []
    },
    "5": {
        "id": 24,
        "value": "Define is matter?",
        "question_type": "mcq",
        "answers": [
            {
                "id": 1,
                "value": "matter nahi karta",
                "correct": false,
                "explanation": null
            },
            {
                "id": 2,
                "value": "bekar ki cheese",
                "correct": false,
                "explanation": null
            },
            {
                "id": 3,
                "value": "tujhe kya",
                "correct": false,
                "explanation": null
            },
            {
                "id": 4,
                "value": "everything around us",
                "correct": true,
                "explanation": "ab sahi hai to mai kya karu"
            }
        ]
    }
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

      { !showAdd && <PaperContent questions={Object.values(paperData)}/>}
      {showAdd && <AddQuestionAnswerToPaper togglePaperAdd={togglePaperAdd} questionNo={1}/>}
    </>
  )
}

export default TestableQuestionPaperContentPaperPage;