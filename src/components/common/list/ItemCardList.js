import PropTypes from "prop-types";
import { Grid } from '@mui/material'
import { ItemCard } from '../card'

ItemCardList.propTypes = {
  itemType: PropTypes.string.isRequired,
  lists: PropTypes.array.isRequired,
  handleViewAll: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired
}

export default function ItemCardList ({
  itemType,
  lists,
  isLoaded,
  handleViewAll,
  handleEdit,
}) {
  return (
    <Grid container spacing={3}>
      {lists && lists.map((item, index) => <ItemCard
        index={index}
        key={item.id}
        data={item}
        handleViewAll={handleViewAll}
        handleEdit={handleEdit}
      />)
      }
      {
        lists.length === 0 && <Grid item xs={12}>{itemType} list is empty</Grid> 
      }
    </Grid>
  )
}

