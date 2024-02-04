import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import './index.css'
const Pagination = ({currentPage, pageCount, onPageChange}) => {
  const handleLeftClick = () => {
    if(currentPage === 1) return
    onPageChange(currentPage-1)
  }

  const handleRightClick = () => {
    if(currentPage === pageCount) return
    onPageChange(currentPage+1)
  }
  return (
    <div className="k-flex k-aic k-jce pagination-container k-pt16">
      <ArrowCircleLeftIcon className="cursor-pointer" onClick={handleLeftClick}/>
      <span className="k-pl8 k-pr8">Page: {currentPage} / Total: {pageCount}</span> 
      <ArrowCircleRightIcon className="cursor-pointer" onClick={handleRightClick}/>
    </div>
  )
}

export default Pagination;