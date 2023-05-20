import PropTypes from 'prop-types';
// @mui
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

BlogPostsSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func,
};

export default function BlogPostsSort({ options, onSort, size='sm', label, value }) {
  return (
    <TextField 
      select 
      size={size} 
      label={label}
      value={value} 
      onChange={onSort}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
