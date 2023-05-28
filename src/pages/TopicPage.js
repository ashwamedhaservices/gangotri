import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useContext } from 'react';
// @mui
import {
  Stack,
  Paper,
  Button,
  Container,
  Typography,
  TextField,
  Grid,
  Breadcrumbs,
  Link
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import { LoadingButton } from '@mui/lab';
import { styled } from "@mui/material/styles";
import ImageInput from '../components/image-input';
import VideoInput from '../components/video-input';
import { getTopic, createTopic, postFileUpload, putFileUpload, storageGetItem } from '../service/ash_admin';
import CourseCard from '../sections/@dashboard/course/CourseCard';
import { useNavigate, useParams } from 'react-router-dom';
import { ChapterContext } from '../context/chapter/chapterContextProvider';
import { SubjectContext } from '../context/subjects/subjectContextProvider';
import { CourseContext } from '../context/courses/courseContextProvider';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ItemContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#232323" : "#f0f0f0",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function TopicPage() {
  const { selectedCourse } = useContext(CourseContext)
  const { selectedSubject } = useContext(SubjectContext)
  const { selectedChapter } = useContext(ChapterContext)
  const navigate = useNavigate();
  const {course_id, subject_id, chapter_id} = useParams();
  const [topicAdd, setTopicAdd] = useState(false);
  const [topic, setTopic] = useState({
    name: "",
    description: "",
    image_url: "",
  });

  const [topicList, setTopicList] = useState([]);
  const [showVideo, setShowVideo] = useState('');
  const [selectedCourseDetails, setSelectedCourseDetails] = useState({});
  const [selectedSubjectDetails, setSelectedSubjectDetails] = useState({});
  const [selectedChapterDetails, setSelectedChapterDetails] = useState({});

  const handleSubjectDetails = (e) => {
    setTopic(() => ({
      ...topic,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    console.log("topic:", topic);
    if(selectedChapterDetails && selectedChapterDetails.id) {
      const res = await createTopic(selectedChapterDetails.id, { topic: topic});
      console.log('creating topic', res);
      setTopicAdd(false);
    }
  };
  const handleImage = async (file) => {
    let inputFile = {...file[0]}
    inputFile.type = file[0].name.split('.')[1];
    inputFile.name = file[0].name.split('.')[0];
    console.log("file:", file[0], inputFile);

    if(selectedCourseDetails.id && selectedSubjectDetails.id && selectedChapterDetails.id) {
      inputFile.location = `course/${selectedCourseDetails.id}/subject/${selectedSubjectDetails.id}/chapter/${selectedChapterDetails.id}/topic/images`;
      // Creating the file location
      const res = await postFileUpload({
        file: {
          ...inputFile
        }
      });
      console.log('upload topic res', res);
      const uploadImageLocation = res.message.split('?')[0]
      if(res) {
        setTopic({
          ...topic,
          image_url: uploadImageLocation
        })
      }

      // Uploading the file to the Storage URL of file location
      const resFileUpload = await putFileUpload(res.message, file[0]);
      console.log('uploaded topic image', resFileUpload);
    }
  };

  const handleVideo = async (file) => {
    let inputFile = {...file[0]}
    inputFile.type = file[0].name.split('.')[1];
    inputFile.name = file[0].name.split('.')[0];
    console.log("video file:", file[0], inputFile);

    if(selectedCourseDetails.id && selectedSubjectDetails.id && selectedChapterDetails.id) {
      inputFile.location = `course/${selectedCourseDetails.id}/subject/${selectedSubjectDetails.id}/chapter/${selectedChapterDetails.id}/topic/videos`;
      // Creating the file location
      const res = await postFileUpload({
        file: {
          ...inputFile
        }
      });
      console.log('upload topic res', res);
      const uploadVideoLocation = res.message.split('?')[0]
      if(res) {
        setTopic({
          ...topic,
          video_url: uploadVideoLocation
        })
      }

      // Uploading the file to the Storage URL of file location
      const resFileUpload = await putFileUpload(res.message, file[0], "video/*");
      console.log('uploaded topic image', resFileUpload);
    }
  }
  useEffect(() => {
    const storageSelectedCourse = JSON.parse(storageGetItem('selectedCourse'))
    setSelectedCourseDetails(() => ({...selectedCourse, ...storageSelectedCourse}))
  }, [selectedCourse])

  useEffect(() => {
    const storageSelectedSubject = JSON.parse(storageGetItem('selectedSubject'))
    setSelectedSubjectDetails(() => ({...selectedSubject, ...storageSelectedSubject}))
  }, [selectedSubject])

  useEffect(() => {
    const storageSelectedChapter = JSON.parse(storageGetItem('selectedChapter'))
    setSelectedChapterDetails(() => ({...selectedChapter, ...storageSelectedChapter}))
  }, [selectedChapter])

  useEffect(() => {
    fetchSubjectChapterTopic()
  }, [topicAdd, selectedCourseDetails, selectedSubjectDetails, selectedChapterDetails]);

  const fetchSubjectChapterTopic = async () => {
    if(selectedChapterDetails && selectedChapterDetails.id) {
      const res = await getTopic(selectedChapterDetails.id);
      console.log('fetchSubjectChapterTopic', res);
      if(res && res.length > 0) {
        setTopicList(() => [...res]);
      }
    }
    
  }

  const watchVideo = (topic) => {
    if(showVideo) {
      setShowVideo('');
    } else {
      setShowVideo(topic.video_url);
    }
  }

  const handleDisable = () => {
    if(!topic.name || !topic.description) return true
    return false
  }

  return (
    <>
      <Helmet>
        <title> Topic | Ashwamedha admin UI </title>
      </Helmet>

      <Container>
        <Stack direction="row">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" onClick={() => navigate(-3)}>
              Course
            </Link>
            <Link
              underline="hover"
              color="inherit"
              onClick={() => navigate(-2)}
            >
              Subject
            </Link>
            <Link
              underline="hover"
              color="inherit"
              onClick={() => navigate(-1)}
            >
              Chapter
            </Link>
            <Typography color="text.primary">Topic</Typography>
          </Breadcrumbs>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Topic
          </Typography>
          {!showVideo && <Button 
            variant="contained" 
            startIcon={!topicAdd ? <Iconify icon="eva:plus-fill" /> : ''} 
            onClick={() => setTopicAdd(!topicAdd)}
          >
            {!topicAdd ? 'New Topic' : 'Cancel'}
          </Button>
        }
        {showVideo && <Button 
            variant="contained" 
            onClick={() => setShowVideo('')}
          >
            Close
          </Button>
        }
        </Stack>
        {selectedCourseDetails && 
          selectedCourseDetails.name && 
          selectedSubjectDetails && 
          selectedSubjectDetails.name && 
          selectedChapterDetails &&
          selectedChapterDetails.description && 
          selectedChapterDetails.name &&
          <ItemContainer sx={{ mb: '1rem'}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  {selectedCourseDetails.name}
                </Typography>
                <hr />
                <Typography variant="body1">
                  {selectedSubjectDetails.name}
                </Typography>
                <hr />
                <Typography variant="body1">
                  {selectedChapterDetails.name}
                </Typography>
                <Typography variant="body2">
                  {selectedChapterDetails.description}
                </Typography>
              </Grid>
            </Grid>
          </ItemContainer>
        }
        {topicAdd && (
          <div>
            <Grid container spacing={2}>
            { selectedCourseDetails.id && selectedSubjectDetails.id && selectedChapterDetails.id && ( <>
              <Grid item xs={12} sm={6}>
                <Item>
                  <Stack sx={{ display:'flex', justifyContent: 'center', alignItems: "center", height: '180px' }}>
                    {/* <TextField
                  autoFocus
                  name="image_url"
                  label="Course File Upload"
                  value={course.image_url}
                  onChange={handleSubjectDetails}
                /> */}
                    <Typography variant="subtitle1" gutterBottom>
                      Upload Image
                    </Typography>
                    <ImageInput handleImage={handleImage} />
                  </Stack>
                </Item>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Item>
                  <Stack sx={{ display:'flex', justifyContent: 'center', alignItems: "center",  }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Upload Video
                    </Typography>

                    <VideoInput height="300px" handleVideo={handleVideo}/>
                  </Stack>
                </Item>
              </Grid>
              </>)
              }
              <Grid item xs={12} sm={6}>
                <Item>
                  <Stack>
                    <TextField
                      autoFocus
                      name="name"
                      label="Topic name*"
                      value={topic.name}
                      onChange={handleSubjectDetails}
                    />
                  </Stack>
                </Item>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Item>
                  <Stack>
                    <TextField
                      name="description"
                      label="Topic description*"
                      value={topic.description}
                      onChange={handleSubjectDetails}
                    />
                  </Stack>
                </Item>
              </Grid>
              
            </Grid>
            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              sx={{ mt: '1rem'}}
              onClick={handleSubmit}
              disabled={handleDisable()}
            >
              Add Topic
            </LoadingButton>
          </div>
        )}
        {!topicAdd && !showVideo && (
          topicList ? (
          <Grid container spacing={3}>
            {topicList.map((topic, index) => (
              <CourseCard key={topic.id} course={topic} index={index} handleClick={() => watchVideo(topic)}/>
            ))}
          </Grid>
          ): 
          <Grid container>
            Select a course, chapter, topic or add a course before adding subject
          </Grid>
        )}
      </Container>
      {
        showVideo && (
          <Container className="a-video-container">
            <video
              className="VideoInput_video a-video"
              width="100%"
              height="100%"
              controls
              src={showVideo}
            />
          </Container>
        )
      }

    </>
  );
}
