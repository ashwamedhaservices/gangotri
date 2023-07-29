import { styled } from "@mui/material/styles";
import {
  Avatar
} from "@mui/material";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: "absolute",
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));
export default StyledAvatar;