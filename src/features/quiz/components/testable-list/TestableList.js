import { Grid } from '@mui/material'
import { TestableCard } from '..'

const TestableList = ({
  papers,
  handleEdit,
  handleView
}) => {
  return (
    <Grid container spacing={2}>
      {
        papers && papers.map((paper) => <TestableCard paper={paper} key={paper.id} handleEdit={handleEdit} handleView={handleView}/>)
      }
    </Grid>
  )
}

export default TestableList