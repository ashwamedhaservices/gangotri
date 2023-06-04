import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
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
  Link,
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import { LoadingButton } from '@mui/lab';
import { styled } from "@mui/material/styles";
import ImageInput from '../components/image-input';
import CourseCard from '../sections/@dashboard/course/CourseCard';
import { getSubject, postFileUpload, putFileUpload, createSubject, storageGetItem } from '../service/ash_admin';
import { useNavigate } from 'react-router-dom';
import { CourseContext } from '../context/courses/courseContextProvider';
import { SubjectContext } from '../context/subjects/subjectContextProvider';
import { createSlug } from '../utils/default';

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


export default function SubjectPage() {
  const { selectedCourse } = useContext(CourseContext)
  const { setSelectedSubject } = useContext(SubjectContext)
  const navigate = useNavigate();

  const [subjectAdd, setSubjectAdd] = useState(false);
  const [subject, setSubject] = useState({
    name: "",
    description: "",
    image_url: "",
  });

  const [subjectList, setSubjectList] = useState([]);
  const [uploadImagePercentage, setUploadImagePercentage] = useState(0);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState({});

  const handleSubjectDetails = (e) => {
    setSubject(() => ({
      ...subject,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    console.log("subject:", subject);
    if(selectedCourseDetails && selectedCourseDetails.id) {
      const res = await createSubject(selectedCourseDetails.id, {subject: subject});
      console.log('creating subject...', res);
      setSubjectAdd(false);
    }
  };
  const handleImage = async (file) => {
    let inputFile = {...file[0]}
    inputFile.type = file[0].name.split('.')[1];
    inputFile.name = file[0].name.split('.')[0];
    console.log("file:", file[0], inputFile);

    if(selectedCourseDetails.id) {
      inputFile.location = `course/${selectedCourseDetails.id}/subject`;
      // Creating the file location
      const res = await postFileUpload({
        file: {
          ...inputFile
        }
      });
      console.log('upload subject res', res);
      const uploadImageLocation = res.message.split('?')[0]
      if(res) {
        setSubject({
          ...subject,
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
      console.log('uploaded subject image', resFileUpload);
    }
  };
  useEffect(() => {
    const storageSelectedCourse = JSON.parse(storageGetItem('selectedCourse'))
    setSelectedCourseDetails(() => ({...selectedCourse, ...storageSelectedCourse}))
  }, [selectedCourse])

  useEffect(() => {
    fetchSubjectData();
  }, [subjectAdd, selectedCourseDetails]);
  
  const fetchSubjectData = async () => {
    if(selectedCourseDetails && selectedCourseDetails.id) {
      const res = await getSubject(selectedCourseDetails.id);
      console.log('fetchSubjectData', res);
      if(res && res.length > 0) {
        setSubjectList(() => [...res]);
      }
    }
    
  }

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject)
    navigate(`${createSlug(subject.name)}/chapter`, { replace: false })
  }

  const handleDisable = () => {
    if(!subject.name || !subject.description) return true
    return false
  }

  return (
    <>
      <Helmet>
        <title> Subject | Ashwamedha admin UI </title>
      </Helmet>

      <Container>
        <Stack direction="row">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" onClick={() => navigate(-1)}>
              Course
            </Link>
            <Typography color="text.primary">Subject</Typography>
          </Breadcrumbs>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Subject
          </Typography>
          <Button 
            variant="contained" 
            startIcon={!subjectAdd ? <Iconify icon="eva:plus-fill" /> : ''} 
            onClick={() => setSubjectAdd(!subjectAdd)}
          >
            {!subjectAdd ? 'New Subject' : 'Cancel' }
          </Button>
        </Stack>
        {selectedCourseDetails && selectedCourseDetails.name && selectedCourseDetails.description && <ItemContainer sx={{ mb: '1rem'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">
                {selectedCourseDetails.name}
              </Typography>
              <Typography variant="body2">
                {selectedCourseDetails.description}
              </Typography>
            </Grid>
          </Grid>
        </ItemContainer>
        }
        {subjectAdd && (
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
                  onChange={handleSubjectDetails}
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
                      label="Subject name*"
                      value={subject.name}
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
                      label="Subject description*"
                      value={subject.description}
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
              Add Subject
            </LoadingButton>
          </div>
        )}
        {!subjectAdd && subjectList && (
          <Grid container spacing={3}>
            {subjectList.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} handleClick={handleSubjectClick}/>
            ))}
          </Grid>
        )}
        {!subjectAdd && !subjectList && (
          <Grid container>
            Select a course or add a course before adding subject
          </Grid>
        )}
      </Container>

    </>
  );
}
