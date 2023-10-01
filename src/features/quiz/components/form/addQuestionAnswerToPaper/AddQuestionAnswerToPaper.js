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

import { useParams } from "react-router-dom";
import { useQuizContext } from '../../../context/quizContextProvider';
import { Answer, Question } from '..';
import { QUESTION_TYPE } from '../../../../../utils/options';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AddQuestionAnswerToPaper = ({
  togglePaperAdd,
  questionNo
}) => {
  const { addQuestionAndAnswersToPaper } = useQuizContext();
  const { testable_type, testable_id, paper_id } = useParams();

  const [question, setQuestion] = useState({ question: '', type: '' });
  const [answer, setAnswer] = useState({ value: '', correct: false, explanation: '' });
  const [answers, setAnswers] = useState([]);

  const handleSubmit = async () => {
    await _addQuestionAndAnswersToPaper();
    togglePaperAdd();
  };

  const handleDisable = () => {
    console.log();
    if(!question.question || !question.type || answerCount() !== answers.length || validationForAnswer()) return true
    return false
  }

  const validationForAnswer = () => {
    return answers.filter((answer) => !answer.value).length > 0
  }

  const _addQuestionAndAnswersToPaper = async () => {
    const questionAnswerData = {
      ...question,
      question_no: questionNo,
      answers: [...answers]
    }
    console.log('[AddQuestionAnswerToPaper]::[_addQuestionAndAnswersToPaper]', questionAnswerData);
    const data = await addQuestionAndAnswersToPaper(paper_id, questionAnswerData);
    console.log('[AddQuestionAnswerToPaper]::[_addQuestionAndAnswersToPaper]', data);
  } 

  const handleQuestionChange = (e) => {
    if(e.target.name === 'type' && e.target.value !== question.type) {
      setAnswers([]);
    }
    setQuestion(() => ({
      ...question,
      [e.target.name]: e.target.value
    }))
  }

  const handleAnswerChange = (e) => {
    setAnswer(() => ({
      ...answer,
      [e.target.name]: e.target.value
    }))
  }

  const handleAddAnswer = () => {
    if(!answer.value) return
    setAnswers(() => [...answers, answer]);
    setAnswer(() => ({value: '', correct: false, explanation: ''}))
    console.log([...answers, answer])
  }

  const answerCount = () => {
    return QUESTION_TYPE.filter((ques) => ques.value === question.type)[0] ? QUESTION_TYPE.filter((ques) => ques.value === question.type)[0]['answer_count'] : 0
  }

  return (
    <>
      <Helmet>
        <title> Question | Ashwamedha admin UI </title>
      </Helmet>

      <Container>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            Add questions to paper of {testable_type} {testable_id}
          </Typography>
        </Stack> */}
        
        <Question question={question} handleChange={handleQuestionChange}/>
        {JSON.stringify(question)}
        
        {
          answers && answers.map((answer, index) => <Stack key={answer.value + index}>
            <Typography variant="body2"><b>Answer value</b> {answer.value}</Typography>
            <Typography variant="body2"><b>Answer explanation</b> {answer.explanation}</Typography>
            <Typography variant="body2"><b>Answer correctness</b> {answer.correct ? 'Yes': 'No'}</Typography>
          </Stack>)
        }

        <Typography variant="body2" gutterBottom sx={{ mt: 2, mb: '-16px', color: 'red'}}>
          Note: ( {answers.length} answer added in the list out of {answerCount() > 1 ?  `${answerCount()} answers` : `${answerCount()} answer`} )
        </Typography>
        { answerCount() !== answers.length && <Answer answer={answer} handleAddAnswer={handleAddAnswer} handleChange={handleAnswerChange} showAddButton={true}/>}
      
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          sx={{ mt: '1rem'}}
          onClick={handleSubmit}
          disabled={handleDisable()}
        >
          Add into paper
        </LoadingButton>
      </Container>
    </>
  )
}

export default AddQuestionAnswerToPaper;