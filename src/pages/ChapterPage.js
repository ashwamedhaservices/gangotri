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
import CourseCard from '../sections/@dashboard/course/CourseCard';
import { BlogPostsSort } from '../sections/@dashboard/blog';
import CHAPTER_LIST from '../_mock/chapter';
import { getCourse, getSubject, getChapter, postFileUpload, putFileUpload, createChapter } from '../service/ash_admin';

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
export default function ChapterPage() {
  const [chapterAdd, setChapterAdd] = useState(false);
  const [chapter, setChapter] = useState({
    name: "Science",
    description: "class 10th science",
    image_url: "www.google.com",
  });

  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [courseList, setCourseList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [chapterList, setChapterList] = useState([]);

  const handleSubjectDetails = (e) => {
    setChapter(() => ({
      ...chapter,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    console.log("chapter:", chapter);
    const res = await createChapter(selectedSubject, {chapter: chapter});
    console.log('creating chapter', res);
    setChapterAdd(false);
  };
  const handleImage = async (file) => {
    let inputFile = {...file[0]}
    inputFile.type = file[0].name.split('.')[1];
    inputFile.name = file[0].name.split('.')[0];
    console.log("file:", file[0], inputFile);

    if(selectedSubject && selectedCourse) {
      inputFile.location = `course/${selectedCourse}/subject/${selectedSubject}/chapter`
      // Creating the file location
      const res = await postFileUpload({
        file: {
          ...inputFile
        }
      });
      console.log('upload subject res', res);
      const uploadImageLocation = res.message.split('?')[0]
      if(res) {
        setChapter({
          ...chapter,
          image_url: uploadImageLocation
        })
      }

      // Uploading the file to the Storage URL of file location
      const resFileUpload = await putFileUpload(res.message, file[0]);
      console.log('uploaded chapter image', resFileUpload);
    }
  };

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
  }, [chapterAdd, selectedSubject]);

  const fetchSubjectChapter = async (subject_id) => {
    const res = await getChapter(subject_id);
    console.log('fetchSubjectChapter', res);
    if(res && res.length > 0) {
      setChapterList(() => [...res]);
    }
  }


  return (
    <>
      <Helmet>
        <title> Chapter | Ashwamedha admin UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Chapter
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Iconify icon="eva:plus-fill" />} 
            onClick={() => setChapterAdd(true)}
          >
            New Chapter
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
        {chapterAdd && (
          <div>
            <Grid container spacing={2}>
              { selectedSubject && selectedCourse && <Grid item xs={12}>
                <Item>
                  <Stack sx={{ display:'flex', justifyContent: 'center', alignItems: "center", height: '100px' }}>
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
              }
              <Grid item xs={12} sm={6}>
                <Item>
                  <Stack>
                    <TextField
                      autoFocus
                      name="name"
                      label="Chapter name"
                      value={chapter.name}
                      onChange={handleSubjectDetails}
                    />
                  </Stack>
                </Item>
              </Grid>
              
              
              { getSubjectOptions() && 
                <Grid item xs={12} sm={2}>
                  <Item>
                    <Stack>
                      <BlogPostsSort options={getSubjectOptions()} label='Subject' onSort={(event) => setSelectedSubject(event.target.value)} value={selectedSubject}/>
                    </Stack>
                  </Item>
                </Grid>
              }
              <Grid item xs={12} sm={8}>
                <Item>
                  <Stack>
                    <TextField
                      autoFocus
                      name="description"
                      label="Chapter description"
                      value={chapter.description}
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
              Add Chapter
            </LoadingButton>
          </div>
        )}
        {!chapterAdd && (
          chapterList ? (
          <Grid container spacing={3}>
            {chapterList.map((chapter, index) => (
              <CourseCard key={chapter.id} course={chapter} index={index} />
            ))}
          </Grid>
          ): 
          <Grid container>
            Select a course or add a course before adding subject
          </Grid>
        )}
      </Container>

    </>
  );
}
