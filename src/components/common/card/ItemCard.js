import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Box, Link, Card, Grid, Typography, CardContent } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LanguageIcon from "@mui/icons-material/Language";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import SchoolIcon from "@mui/icons-material/School";
//
import SvgColor from "../../../components/svg-color";
// utils
import { fDate } from "../../../utils/formatTime";
import { StyledAvatar } from "../../styled/Avatar";
import { StyledCover } from "../../styled/Img";
// ----------------------------------------------------------------------

const StyledTitle = styled(Link)({
  // height: 44,
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

const ItemCard = ({ data, index, handleViewAll, handleEdit }) => {
  const default_img_url = "/assets/images/covers/cover_17.jpg";
  const {
    name,
    description,
    image_url,
    language,
    level,
    created_at,
  } = data;
  // const latestPostLarge = index === 0;
  // const latestPost = index === 1 || index === 2;
  const latestPostLarge = false;
  const latestPost = false;
  // const POST_INFO = [
  //   { number: comment, icon: 'eva:message-circle-fill' },
  //   { number: view, icon: 'eva:eye-fill' },
  //   { number: share, icon: 'eva:share-fill' },
  // ];
  return (
    <Grid
      item
      xs={12}
      sm={latestPostLarge ? 12 : 6}
      md={latestPostLarge ? 6 : 3}
    >
      <Card
        sx={
          ({
            position: "relative",
            transition: "transform 3s ease-in-out",
            cursor: "pointer",
          },
          {
            "&:hover": {
              transform: "scale3d(1.05, 1.05, 1)",
            },
          })
        }
      >
        <Box
          sx={{
            position: "relative",
            paddingTop: "calc(100% * 3 / 4)",
            ...((latestPostLarge || latestPost) && {
              pt: "calc(100% * 4 / 3)",
              "&:after": {
                top: 0,
                content: "''",
                width: "100%",
                height: "100%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: "calc(100% * 4 / 3)",
                sm: "calc(100% * 3 / 4.66)",
              },
            }),
          }}
        >
          <SvgColor
            color="paper"
            src="/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: "absolute",
              color: "background.paper",
              ...((latestPostLarge || latestPost) && { display: "none" }),
            }}
          />
          {/* <StyledAvatar
            alt={author.name}
            src={author.avatarUrl}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
              }),
            }}
          /> */}
          <StyledCover alt={name} src={image_url || default_img_url} />
        </Box>
        <CardContent
          sx={{
            padding: 0,
            paddingTop: "12px",
            paddingRight: "16px",
            top: 0,
            width: "100%",
            position: (latestPostLarge || latestPost) && "absolute",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: latestPostLarge || latestPost ? "column" : "row",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              ...((latestPostLarge || latestPost) && {
                color: "grey.500",
              }),
              gap: latestPostLarge || latestPost ? '4px' : '8px'
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "grey.500",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                ...((latestPostLarge || latestPost) && {
                  color: "common.white",
                }),
              }}
              onClick={() => handleEdit(data)}
            >
              <EditIcon sx={{ fontSize: 13, marginRight: "4px" }} />
              Edit
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "grey.500",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                ml: latestPostLarge || latestPost ? 0 : 1,
                ...((latestPostLarge || latestPost) && {
                  color: "common.white",
                }),
              }}
              onClick={() => handleViewAll(data)}
            >
              <ViewModuleIcon sx={{ fontSize: 13, marginRight: "4px" }} />
              View All
            </Typography>
          </Box>
        </CardContent>

        <CardContent
          sx={{
            pt: latestPostLarge || latestPost ? 4 : 1,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: "100%",
              position: "absolute",
            }),
          }}
        >
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: "text.disabled", display: "block" }}
          >
            {fDate(created_at)}
          </Typography>

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="none"
            sx={{
              ...(latestPostLarge && { typography: "h5" }),
              ...((latestPostLarge || latestPost) && {
                color: "common.white",
              }),
            }}
          >
            {name}
          </StyledTitle>

          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: "text.disabled", display: "block" }}
            className="truncate-3"
          >
            {description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            {language && (
              <Typography
                variant="caption"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mr: 1,
                  typography: "body2",
                }}
              >
                <LanguageIcon sx={{ fontSize: 12, marginRight: "4px" }} />
                {language}
              </Typography>
            )}
            {level && (
              <Typography
                variant="caption"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  typography: "body2",
                }}
              >
                <SchoolIcon sx={{ fontSize: 12, marginRight: "4px" }} />
                {level}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

ItemCard.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default ItemCard;

// TODO: Improvements:
// 1.) Options can be passed as props
