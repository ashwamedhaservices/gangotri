import { styled } from "@mui/material/styles";
import { 
  Stack,
  Paper,
  Typography,
  TextField,
  Grid, 
} from '@mui/material';
import { BlogPostsSort } from '../../../../../sections/@dashboard/blog';
import { QUESTION_TYPE } from "../../../../../utils/options";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Question = ({
  question,
  handleChange
}) => {
  
  return (
    <>
     <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="body2" gutterBottom>
          Question
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Item>
            <Stack>
              <TextField
                label="Question title*"
                name="question"
                variant="outlined"
                fullWidth
                value={question.question}
                onChange={handleChange}
                margin="normal"
              />
            </Stack>
          </Item>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Item>
            <Stack>
              <BlogPostsSort
                name="type"
                label="Question type"
                value={question.type}
                onChange={handleChange}
                options={QUESTION_TYPE}
              />
            </Stack>
          </Item>
        </Grid>
      </Grid>
    </>
  )
}

export default Question