import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import { AuthContextProvider } from './context/authentication/authContextProvider'
import { CourseContextProvider } from './context/courses/courseContextProvider';
import { SubjectContextProvider } from './context/subjects/subjectContextProvider';
import { ChapterContextProvider } from './context/chapter/chapterContextProvider';

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <AuthContextProvider>
              <CourseContextProvider>
                <SubjectContextProvider>
                  <ChapterContextProvider>
                    <ScrollToTop />
                    <Router />
                  </ChapterContextProvider>
                </SubjectContextProvider>
              </CourseContextProvider>
            </AuthContextProvider>
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </div>
  );
}

export default App;
