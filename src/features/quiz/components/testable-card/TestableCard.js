import { styled } from "@mui/material/styles";
import { Stack, Grid, Paper, Button, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.text.secondary}`,
  maxHeight: '148px',
}));

const TestableCard = ({
  paper,
  handleEdit,
  handleView
}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Stack direction="column">
        <Item>
          <Typography>{paper.name}</Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.disabled", display: "block" }}
            className="truncate-3"
          >
            {paper.notes}
          </Typography>
          <Stack direction="row" justifyContent="space-between" mt={2}>
            <Button 
              variant="outlined"
              onClick={() => handleView(paper)}
            >
              View
            </Button>
            {/* <Button 
              variant="contained"
              onClick={() => handleEdit(paper)}
            >
              Edit
            </Button> */}
          </Stack>
        </Item>
      </Stack>
    </Grid>
  )
}

export default TestableCard