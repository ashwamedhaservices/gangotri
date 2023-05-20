import { Link } from "react-router-dom"
import './index.css'
const PageNotFound = () => {
  return (
    <div className="page-not-found__container">
      <h1>404 Error: Page Not Found</h1>
      <p>The page you are looking for cannot be found.</p>
      <div className="page-link"><Link to="/orders">Orders</Link></div>
    </div>
  )
}

export default PageNotFound