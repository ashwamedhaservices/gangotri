import { styled } from "@mui/material/styles";
import { Container, Stack, Grid, Paper, Chip, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.text.secondary}`,
}));

const PaperContentItem = ({ questionNo, questionItem }) => {
  return (
    <Grid item xs={12} sm={6}>
      <Item>
        <Stack>
          <QuestionItem
            questionNo={questionNo}
            question={questionItem.value}
            questionType={questionItem.question_type}
          />
          <AnswersItem answers={questionItem.answers} />
        </Stack>
      </Item>
    </Grid>
  );
};

export const QuestionItem = ({ questionNo, question, questionType }) => {
  return (
    <Stack direction="row" spacing={1} justifyContent="space-between">
      <Typography variant="body2">
        ({questionNo}.) {question}.
      </Typography>
      <Chip
        label={questionType}
        color="success"
        variant="outlined"
        size="small"
      />
    </Stack>
  );
};

export const AnswersItem = ({ answers }) => {
  const convertToAlphabet = (number) =>
    String.fromCharCode(number + "a".charCodeAt(0));

  return (
    <Container>
      {answers &&
        answers.map((answer, index) => (
          <Stack key={answer.id} spacing={1} direction="row">
            <Typography variant="body2">
              ({convertToAlphabet(index)}.) {answer.value}.
            </Typography>
            {answer.correct && <CheckIcon fontSize="small" />}
          </Stack>
        ))}
    </Container>
  );
};

export default PaperContentItem;
