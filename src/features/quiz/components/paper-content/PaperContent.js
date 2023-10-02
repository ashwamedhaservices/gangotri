import { Container, Grid, Typography } from "@mui/material";
import PaperContentItem from "./PaperContentItem";

const PaperContent = ({ questions }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        {questions.length === 0 && (
          <Grid item>
            <Typography variant="body2" gutterBottom>
              There is no question added
            </Typography>
          </Grid>
        )}
        {questions &&
          questions.map((question, index) => (
            <PaperContentItem
              questionItem={question}
              questionNo={index + 1}
              key={question.id}
            />
          ))}
      </Grid>
    </Container>
  );
};

export default PaperContent;
