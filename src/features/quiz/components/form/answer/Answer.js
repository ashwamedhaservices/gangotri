import { styled } from "@mui/material/styles";
import { 
  Stack,
  Paper,
  Typography,
  TextField,
  Grid,
  Button, 
} from '@mui/material';
import { BlogPostsSort } from '../../../../../sections/@dashboard/blog';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Answer = ({
  answer,
  handleChange,
  handleAddAnswer,
  showAddButton
}) => {

  const CORRECT = [
    { value: true, label: 'Yes'},
    { value: false, label: 'No'},
  ]
  return (
    <>
     <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} mt={2}>
        <Typography variant="body2" gutterBottom>
          Answer
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Item>
            <Stack>
              <TextField
                label="Answer title*"
                name="value"
                variant="outlined"
                fullWidth
                value={answer.value}
                onChange={handleChange}
                margin="normal"
              />
            </Stack>
          </Item>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Item>
            <Stack>
              <TextField
                label="Answer explanation"
                name="explanation"
                variant="outlined"
                fullWidth
                value={answer.explanation}
                onChange={handleChange}
                margin="normal"
              />
            </Stack>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Item>
            <Stack>
              <BlogPostsSort
                name="correct"
                label="Answer correctness"
                value={answer.correct}
                onChange={handleChange}
                options={CORRECT}
              />
            </Stack>
          </Item>
        </Grid>
        {showAddButton && <Grid item xs={12} sm={6} md={1}>
          <Item>
            <Stack>
              <Button
                variant="outlined"
                onClick={() => handleAddAnswer(answer)}
              >
                Add
              </Button>
            </Stack>
          </Item>
        </Grid>
        }
      </Grid>
    </>
  )
}

export default Answer