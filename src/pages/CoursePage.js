import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
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
} from "@mui/material";
// components
import Iconify from "../components/iconify";

import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import ImageInput from "../components/image-input";
import CourseCard from "../sections/@dashboard/course/CourseCard";
import { createCourse, postFileUpload, putFileUpload } from "../service/ash_admin";
import { useNavigate } from "react-router-dom";
import { BlogPostsSort } from "../sections/@dashboard/blog";
import { LANGUAGES, LEVEL } from "../utils/options";
import { CourseContext } from "../context/courses/courseContextProvider";
import { createSlug } from "../utils/default";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CoursePage() {
  const { courseList, setAllCourses, setSelectedCourse } = useContext(CourseContext)
  const navigate = useNavigate();
  const [courseAdd, setCourseAdd] = useState(false);
  const [course, setCourse] = useState({
    name: "",
    description: "",
    image_url: "",
    level: "",
    language: ""
  });
  const [uploadImagePercentage, setUploadImagePercentage] = useState(0);
  const [coursesList, setCoursesList] = useState([]);

  const handleCourseDetails = (e) => {
    setCourse(() => ({
      ...course,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    console.log("course:", course);
    const res = await createCourse({ course: course })
    console.log('creating Course...', res)
    setCourseAdd(false);
  };
  const handleImage = async(file) => {
    let inputFile = {...file[0]}
    inputFile.type = file[0].name.split('.')[1];
    inputFile.name = file[0].name.split('.')[0];
    inputFile.location = 'course';
    console.log("file:", file[0], inputFile);
    
    // data.append("type", file[0].name.split('.')[1]);
    // data.append('name', file[0].name.split('.')[0])
    // data.append('location', '/course')
    // console.log('uploading this file', data, data.entries());
    // const res = await postFileUpload(data);

    // Creating the file location
    const res = await postFileUpload({
      file: {
        ...inputFile
      }
    });
    console.log('upload course res', res);
    const uploadImageLocation = res.message.split('?')[0]
    if(res) {
      setCourse({
        ...course,
        image_url: uploadImageLocation,
      })
    }
    
    // Uploading the file to the Storage URL of file location
    const resFileUpload = await putFileUpload(
                                  res.message, 
                                  file[0],
                                  (progressEvent) => {
                                    const percentage= parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                                    setUploadImagePercentage(percentage);
                                    return percentage; // Because you were returning the percentage before.
                                  });
    console.log('uploaded course image', resFileUpload);
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseAdd]);

  const fetchCourseData = async () => {
    console.log('[CoursePage]::fetchCourseData');
    await setAllCourses();
  }

  useEffect(() => {
    setCoursesList(() => [...courseList])
  }, [courseList])

  const handleCourseClick = (course) => {
    setSelectedCourse(course)
    navigate(`${createSlug(course.name)}/subject`, { replace: false })
  }

  const handleDisable = () => {
    if(!course.name || !course.description || !course.level || !course.language) return true
    return false
  }

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  
  return (
    <>
      <Helmet>
        <title> Course | Ashwamedha admin UI </title>
      </Helmet>

      <Container>
        <Stack direction="row">
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.primary">Course</Typography>
          </Breadcrumbs>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            All Courses
          </Typography>
          <Button
            variant="contained"
            startIcon={!courseAdd ? <Iconify icon="eva:plus-fill" /> : ''}
            onClick={() => setCourseAdd(!courseAdd)}
          >
           {!courseAdd ?  'New Course' : 'Cancel'}
          </Button>
        </Stack>
        {courseAdd && (
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Item>
                  <Stack sx={{ display:'flex', justifyContent: 'center', alignItems: "center" }}>
                    {/* <TextField
                  autoFocus
                  name="image_url"
                  label="Course File Upload"
                  value={course.image_url}
                  onChange={handleCourseDetails}
                /> */}
                    <Typography variant="subtitle1" gutterBottom>
                      Upload Image
                    </Typography>
                    <ImageInput handleImage={handleImage} percentage={uploadImagePercentage}/>
                  </Stack>
                </Item>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Item>
                  <Stack>
                    <TextField
                      autoFocus
                      name="name"
                      label="Course name*"
                      value={course.name}
                      onChange={handleCourseDetails}
                    />
                  </Stack>
                </Item>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>
                  <Stack>
                    <BlogPostsSort
                      name="language"
                      label="Course language*"
                      value={course.language}
                      onChange={handleCourseDetails}
                      options={LANGUAGES}
                    />
                  </Stack>
                </Item>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Item>
                  <Stack>
                    <BlogPostsSort
                      name="level"
                      label="Course level*"
                      value={course.level}
                      onChange={handleCourseDetails}
                      options={LEVEL}
                    />
                  </Stack>
                </Item>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Item>
                  <Stack>
                    <TextField
                      name="description"
                      label="Course description*"
                      value={course.description}
                      onChange={handleCourseDetails}
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
              Add Course
            </LoadingButton>
          </div>
        )}
        {!courseAdd && coursesList && (
          <Grid container spacing={3}>
            {coursesList.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} handleClick={handleCourseClick}/>
            ))}
          </Grid>
        )}
        {
          !courseAdd && !coursesList && (
            <Grid container>
              Please add Courses
            </Grid>
          )
        }
      </Container>
    </>
  );
}
