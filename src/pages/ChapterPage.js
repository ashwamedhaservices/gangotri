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
import {  getChapter, postFileUpload, putFileUpload, createChapter } from '../service/ash_admin';
import { useNavigate, useParams } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ChapterPage() {
  const navigate = useNavigate();
  const {course_id, subject_id} = useParams();
  const [chapterAdd, setChapterAdd] = useState(false);
  const [chapter, setChapter] = useState({
    name: "",
    description: "",
    image_url: "",
  });

  const [chapterList, setChapterList] = useState([]);

  const handleSubjectDetails = (e) => {
    setChapter(() => ({
      ...chapter,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    console.log("chapter:", chapter);
    const res = await createChapter(subject_id, {chapter: chapter});
    console.log('creating chapter', res);
    setChapterAdd(false);
  };
  const handleImage = async (file) => {
    let inputFile = {...file[0]}
    inputFile.type = file[0].name.split('.')[1];
    inputFile.name = file[0].name.split('.')[0];
    console.log("file:", file[0], inputFile);

    if(subject_id && course_id) {
      inputFile.location = `course/${course_id}/subject/${subject_id}/chapter`
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
    subject_id && fetchSubjectChapter(subject_id)
  }, [chapterAdd, subject_id]);

  const fetchSubjectChapter = async (subjectId) => {
    const res = await getChapter(subjectId);
    console.log('fetchSubjectChapter', res);
    if(res && res.length > 0) {
      setChapterList(() => [...res]);
    }
  }

  const handleChapterClick = (chapter_id) => {
    navigate(`${chapter_id}/topic`, { replace: false })
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
        {chapterAdd && (
          <div>
            <Grid container spacing={2}>
              { subject_id && course_id && <Grid item xs={12}>
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
              <CourseCard key={chapter.id} course={chapter} index={index} handleClick={handleChapterClick}/>
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
