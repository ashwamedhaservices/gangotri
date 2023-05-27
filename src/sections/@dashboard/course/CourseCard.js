import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  // height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(1),
  color: theme.palette.text.disabled,
}));

const StyledLanguageInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  marginTop: theme.spacing(1),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});


const CourseCard = ({ course, index, handleClick }) => {
  const default_img_url = '/assets/images/covers/cover_17.jpg'
  const {
    id,
    name,
    description,
    image_url,
    status,
    price,
    language,
    level,
    hours,
    topic_count,
    enrolled,
    created_at,
    updated_at
  } = course;
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
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={
        { 
        position: 'relative',
        transition: 'transform 3s ease-in-out',
        cursor: 'pointer',
        }, 
        {
          "&:hover": {
            transform: 'scale3d(1.05, 1.05, 1)',
          }
        }
      } 
      onClick={() => handleClick(course)}>
        <StyledCardMedia
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
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
              position: 'absolute',
              color: 'background.paper',
              ...((latestPostLarge || latestPost) && { display: 'none' }),
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
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }),
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {fDate(created_at)}
          </Typography>

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="none"
            sx={{
              ...(latestPostLarge && { typography: 'h5'}),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white',
              }),
            }}
          >
            {name}
          </StyledTitle>

          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }} className="truncate-3">
            {description}
          </Typography>

          {/* <StyledInfo>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500',
                  }),
                }}
              >
                <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </StyledInfo> */}

          <StyledLanguageInfo>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...((latestPostLarge || latestPost) && {
                  color: 'black.500',
                }),
              }}
            >
              { language && <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', mr: 1, typography: 'body2' }}><LanguageIcon sx={{ fontSize: 12 }}/>{language}</Typography>}
              { level && <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', typography: 'body2' }}><PriorityHighIcon sx={{ fontSize: 12 }}/>{level}</Typography>}
            </Box>
          </StyledLanguageInfo>

          <StyledLanguageInfo>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...((latestPostLarge || latestPost) && {
                  color: 'grey.500',
                }),
              }}
            >
              { hours && <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', mr: 1 }}><AccessTimeIcon sx={{ fontSize: 12 }}/>{hours} Hours</Typography>}
              { price && <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}><CurrencyRupeeIcon sx={{ fontSize: 12 }}/>{price}</Typography>}
            </Box>
          </StyledLanguageInfo>

        </CardContent>
      </Card>
    </Grid>
  )
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default CourseCard;