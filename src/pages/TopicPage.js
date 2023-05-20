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
import { BlogPostsSort } from '../sections/@dashboard/blog';
import VideoInput from '../components/video-input';
import { getCourse, getSubject, getChapter, getTopic, createTopic, postFileUpload, putFileUpload } from '../service/ash_admin';
import CourseCard from '../sections/@dashboard/course/CourseCard';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];
export default function TopicPage() {
  const [topicAdd, setTopicAdd] = useState(false);
  const [topic, setTopic] = useState({
    name: "Science",
    description: "class 10th science",
    image_url: "www.google.com",
  });


  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [courseList, setCourseList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [chapterList, setChapterList] = useState([]);
  const [topicList, setTopicList] = useState([]);

  const handleSubjectDetails = (e) => {
    setTopic(() => ({
      ...topic,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    console.log("topic:", topic);
    const res = await createTopic(selectedChapter, { topic: topic});
    console.log('creating topic', res);
    setTopicAdd(false);
  };
  const handleImage = async (file) => {
    let inputFile = {...file[0]}
    inputFile.type = file[0].name.split('.')[1];
    inputFile.name = file[0].name.split('.')[0];
    console.log("file:", file[0], inputFile);

    if(selectedSubject && selectedCourse && selectedChapter) {
      inputFile.location = `course/${selectedCourse}/subject/${selectedSubject}/chapter/${selectedChapter}/topic/images`;
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

    if(selectedSubject && selectedCourse && selectedChapter) {
      inputFile.location = `course/${selectedCourse}/subject/${selectedSubject}/chapter/${selectedChapter}/topic/videos`;
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
    fetchCourseData();
  }, []);

  const fetchCourseData = async () => {
    const res = await getCourse();
    console.log('fetchCourseData', res);
    if(res && res.length > 0) {
      setCourseList(() => [...res]);
    }
  }

  const getCoursesOptions = () => {
    if(courseList) {
      return courseList.map((course) => ({
        value: course.id,
        label: course.name,
      }))
    }
    return []
  }

  useEffect(() => {
    selectedCourse && fetchSubjectData(selectedCourse);
  }, [selectedCourse]);
  
  const fetchSubjectData = async (course_id) => {
    const res = await getSubject(course_id);
    console.log('fetchSubjectData', res);
    if(res && res.length > 0) {
      setSubjectList(() => [...res]);
    }
  }

  const getSubjectOptions = () => {
    if(subjectList) {
      return subjectList.map((subject) => ({
        value: subject.id,
        label: subject.name,
      }))
    }
    return []
  }

  useEffect(() => {
    selectedSubject && fetchSubjectChapter(selectedSubject)
  }, [selectedSubject]);

  const fetchSubjectChapter = async (subject_id) => {
    const res = await getChapter(subject_id);
    console.log('fetchSubjectChapter', res);
    if(res && res.length > 0) {
      setChapterList(() => [...res]);
    }
  }

  const getChapterOptions = () => {
    if(chapterList) {
      return chapterList.map((chapter) => ({
        value: chapter.id,
        label: chapter.name,
      }))
    }
    return []
  }

  useEffect(() => {
    selectedChapter && fetchSubjectChapterTopic(selectedChapter)
  }, [topicAdd, selectedChapter]);

  const fetchSubjectChapterTopic = async (chapter_id) => {
    const res = await getTopic(chapter_id);
    console.log('fetchSubjectChapterTopic', res);
    if(res && res.length > 0) {
      setTopicList(() => [...res]);
    }
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
            startIcon={<Iconify icon="eva:plus-fill" />} 
            onClick={() => setTopicAdd(true)}
          >
            New Topic
          </Button>
        </Stack>
        {getCoursesOptions() && 
          <Grid item xs={12} sm={2}>
            <Item>
              <Stack>
                <BlogPostsSort options={getCoursesOptions()} label='Course' onSort={(event) => setSelectedCourse(event.target.value)} value={selectedCourse}/>
              </Stack>
            </Item>
          </Grid>
        }
        { getSubjectOptions() && 
          <Grid item xs={12} sm={2}>
            <Item>
              <Stack>
                <BlogPostsSort options={getSubjectOptions()} label='Subject' onSort={(event) => setSelectedSubject(event.target.value)} value={selectedSubject}/>
              </Stack>
            </Item>
          </Grid>
        }

        { getChapterOptions() && 
          <Grid item xs={12} sm={2}>
            <Item>
              <Stack>
                <BlogPostsSort options={getChapterOptions()} label='Chapter' onSort={(event) => setSelectedChapter(event.target.value)} value={selectedChapter}/>
              </Stack>
            </Item>
          </Grid>
        }
        {topicAdd && (
          <div>
            <Grid container spacing={2}>
            { selectedSubject && selectedCourse && selectedChapter && ( <>
              <Grid item xs={12} sm={6}>
                <Item>
                  <Stack sx={{ display:'flex', justifyContent: 'center', alignItems: "center" }}>
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
                      label="Topic name"
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
                      label="Topic description"
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
              onClick={handleSubmit}
            >
              Add Topic
            </LoadingButton>
          </div>
        )}
        {!topicAdd && (
          topicList ? (
          <Grid container spacing={3}>
            {topicList.map((chapter, index) => (
              <>
                <CourseCard key={chapter.id} course={chapter} index={index} />
                {/* {chapter && (
                  <video
                    className="VideoInput_video"
                    width="100%"
                    height="300px"
                    controls
                    src={chapter.video_url}
                  />
                )} */}
              </>
            ))}
          </Grid>
          ): 
          <Grid container>
            Select a course, chapter, topic or add a course before adding subject
          </Grid>
        )}
      </Container>

    </>
  );
}
