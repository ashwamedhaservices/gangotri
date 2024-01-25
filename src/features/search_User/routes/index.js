import SearchUser from "../components/search-user";
import PersonalInfo from "../components/personalInfo";

const SearchUserRoutes = [
  { path: 'search-user', element: <SearchUser/> },
  { path: 'search-user/personalInfo', element:<PersonalInfo/>},

  
];

export default SearchUserRoutes;