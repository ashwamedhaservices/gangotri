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
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { LoadingButton } from '@mui/lab';
import { styled } from "@mui/material/styles";
import ImageInput from '../../../components/image-input';
import { getChapter, postFileUpload, putFileUpload, createChapter, storageGetItem, putChapter } from '../../../service/ash_admin';
import { useNavigate } from 'react-router-dom';
import { CourseContext } from '../../../context/courses/courseContextProvider';
import { SubjectContext } from '../../../context/subjects/subjectContextProvider';
import { ChapterContext } from '../../../context/chapter/chapterContextProvider';
import { createSlug } from '../../../utils/default';
import { ItemCardList } from '../../../components/common/list';

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

export default function ChapterPage() {
  const { selectedCourse } = useContext(CourseContext)
  const { selectedSubject } = useContext(SubjectContext)
  const { setSelectedChapter } = useContext(ChapterContext)
  const navigate = useNavigate();
  const [chapterAdd, setChapterAdd] = useState(false);
  const [chapter, setChapter] = useState({
    name: "",
    description: "",
    image_url: "",
  });

  const [chapterList, setChapterList] = useState([]);
  const [uploadImagePercentage, setUploadImagePercentage] = useState(0);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState({});
  const [selectedSubjectDetails, setSelectedSubjectDetails] = useState({});

  const handleSubjectDetails = (e) => {
    setChapter(() => ({
      ...chapter,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    console.log("chapter:", chapter);
    if(selectedSubjectDetails && selectedSubjectDetails.id) {
      const res = chapter && (chapter.id ? await putChapter(chapter.id, {chapter: chapter}) : await createChapter(selectedSubjectDetails.id, {chapter: chapter}));
      console.log('creating chapter', res);
      setChapterAdd(false);
    }
  };
  const handleImage = async (file) => {
    let inputFile = {...file[0]}
    inputFile.type = file[0].name.split('.')[1];
    inputFile.name = file[0].name.split('.')[0];
    console.log("file:", file[0], inputFile);

    if(selectedSubjectDetails.id && selectedCourseDetails.id) {
      inputFile.location = `course/${selectedCourseDetails.id}/subject/${selectedSubjectDetails.id}/chapter`
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
      const resFileUpload = await putFileUpload(
                                    res.message, 
                                    file[0],
                                    (progressEvent) => {
                                      const percentage= parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                                      setUploadImagePercentage(percentage);
                                      return percentage; // Because you were returning the percentage before.
                                    });
      console.log('uploaded chapter image', resFileUpload);
    }
  };

  useEffect(() => {
    const storageSelectedCourse = JSON.parse(storageGetItem('selectedCourse'))
    setSelectedCourseDetails(() => ({...selectedCourse, ...storageSelectedCourse}))
  }, [selectedCourse])

  useEffect(() => {
    const storageSelectedSubject = JSON.parse(storageGetItem('selectedSubject'))
    setSelectedSubjectDetails(() => ({...selectedSubject, ...storageSelectedSubject}))
  }, [selectedSubject])

  useEffect(() => {
    fetchSubjectChapter()
  }, [chapterAdd, selectedCourseDetails, selectedSubjectDetails]);

  const fetchSubjectChapter = async () => {
    if(selectedSubjectDetails && selectedSubjectDetails.id) {
      const res = await getChapter(selectedSubjectDetails.id);
      console.log('fetchSubjectChapter', res);
      if(res && res.length > 0) {
        setChapterList(() => [...res]);
      }
    }
  }

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    navigate(`${createSlug(chapter.name)}/topic`, { replace: false })
  }

  const handleDisable = () => {
    if(!chapter.name || !chapter.description) return true
    return false
  }

  const handleEdit = (chapter) => {
    setChapterAdd(true);
    setChapter(chapter);
  };

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
            startIcon={!chapterAdd ? <Iconify icon="eva:plus-fill" /> : ''} 
            onClick={() => {
              setChapterAdd(!chapterAdd);
              setUploadImagePercentage(0);
              setChapter({
                name: "",
                description: "",
                image_url: "",
              });
            }}
          >
            { !chapterAdd ? 'New Chapter' : 'Cancel' }
          </Button>
        </Stack>
        {selectedCourseDetails && 
          selectedCourseDetails.name && 
          selectedSubjectDetails && 
          selectedSubjectDetails.name && 
          selectedSubjectDetails.description && 
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
                <Typography variant="body2">
                  {selectedSubjectDetails.description}
                </Typography>
              </Grid>
            </Grid>
          </ItemContainer>
        }
        {chapterAdd && (
          <div>
            <Grid container spacing={2}>
              { selectedSubjectDetails.id && selectedCourseDetails.id && <Grid item xs={12}>
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
                    <ImageInput previewImage={chapter.image_url} handleImage={handleImage} percentage={uploadImagePercentage}/>
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
                      label="Chapter name*"
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
                      name="description"
                      label="Chapter description*"
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
              sx={{ mt: '1rem'}}
              onClick={handleSubmit}
              disabled={handleDisable()}
            >
              {chapter && chapter.id ? 'Update' : 'Add'} Chapter
            </LoadingButton>
          </div>
        )}
        { !chapterAdd &&
          <ItemCardList
            itemType="Chapter" 
            lists={chapterList}
            handleViewAll={handleChapterClick}
            handleEdit={handleEdit}
          />
        }
      </Container>

    </>
  );
}
