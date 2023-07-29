import { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { Breadcrumbs, Container, Stack, Typography } from "@mui/material";
import { toTitleCase } from "../../../utils/text-typecase";

const LayoutBreadcrumb = () => {
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const params = useParams();

  useEffect(() => {
    const paramsValue = Object.values(params);
    setLinks(() => pathname.split('/').filter((path) => path && !paramsValue.includes(path)));
  }, [pathname, params]);

  const handleNavigation = (index) => {
    let len = links.length
    navigate(index - len + 1);
  }

  return (
    <Container>
      <Stack direction="row">
        <Breadcrumbs aria-label="breadcrumb">
          {
            links.map((link, index) => (
              index !== links.length - 1 ? <Link 
                key={link + index}
                underline="hover" 
                color="inherit"
                preventScrollReset={true}
                onClick={() => handleNavigation(index)}
              >{toTitleCase(link)}</Link>
              : 
              <Typography key={link + index} color="text.primary">{toTitleCase(link)}</Typography>
            ))
          }
        </Breadcrumbs>
      </Stack>
    </Container>
  )
}

export default LayoutBreadcrumb