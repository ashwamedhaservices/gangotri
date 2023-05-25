import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import {
  Stack,
  Paper,
  Button,
  Container,
  Typography,
  TextField,
  Grid,
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import { LoadingButton } from '@mui/lab';
import { styled } from "@mui/material/styles";
import ImageInput from '../components/image-input';
import VideoInput from '../components/video-input';
import { getTopic, createTopic, postFileUpload, putFileUpload } from '../service/ash_admin';
import CourseCard from '../sections/@dashboard/course/CourseCard';
import { useNavigate, useParams } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function TopicPage() {
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

  const handleSubjectDetails = (e) => {
    setTopic(() => ({
      ...topic,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    console.log("topic:", topic);
    const res = await createTopic(chapter_id, { topic: topic});
    console.log('creating topic', res);
    setTopicAdd(false);
  };
  const handleImage = async (file) => {
    let inputFile = {...file[0]}
    inputFile.type = file[0].name.split('.')[1];
    inputFile.name = file[0].name.split('.')[0];
    console.log("file:", file[0], inputFile);

    if(subject_id && course_id && chapter_id) {
      inputFile.location = `course/${course_id}/subject/${subject_id}/chapter/${chapter_id}/topic/images`;
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

    if(subject_id && course_id && chapter_id) {
      inputFile.location = `course/${course_id}/subject/${subject_id}/chapter/${chapter_id}/topic/videos`;
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
    chapter_id && fetchSubjectChapterTopic(chapter_id)
  }, [topicAdd, chapter_id]);

  const fetchSubjectChapterTopic = async (chapter_id) => {
    const res = await getTopic(chapter_id);
    console.log('fetchSubjectChapterTopic', res);
    if(res && res.length > 0) {
      setTopicList(() => [...res]);
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Topic
          </Typography>
          <Button 
            variant="contained" 
            startIcon={!topicAdd ? <Iconify icon="eva:plus-fill" /> : ''} 
            onClick={() => setTopicAdd(!topicAdd)}
          >
            {!topicAdd ? 'New Topic' : 'Cancel'}
          </Button>
        </Stack>
        {topicAdd && (
          <div>
            <Grid container spacing={2}>
            { subject_id && course_id && chapter_id && ( <>
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
                      autoFocus
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
          <Container>
            <video
              className="VideoInput_video"
              width="100%"
              height="300px"
              controls
              src={showVideo}
            />
            <Button 
              variant="contained"
              onClick={() => watchVideo(showVideo)}
            >
              Go to Topics
            </Button>
          </Container>
        )
      }

    </>
  );
}
