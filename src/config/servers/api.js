// export const API_BASE_URL = 'http://64.227.164.116';
export const API_BASE_URL = 'https://apistage.ashwamedha.net';

export const API_BASE_VERSION = '/api/v1';

export const API_BASE_VERSION_URL = `${API_BASE_URL}${API_BASE_VERSION}`;

// For Login
export const ADMIN_LOGIN = () =>  `${API_BASE_URL}${API_BASE_VERSION}/users/login`;

// For Courses Get and Post
export const COURSE_CREATE = () => `${API_BASE_VERSION_URL}/courses.json`;
export const COURSE_GET = () => `${API_BASE_VERSION_URL}/courses.json`;

// For Subject Get and Post
export const SUBJECT_CREATE = (course_id) => `${API_BASE_VERSION_URL}/courses/${course_id}/subjects.json`;
export const SUBJECT_GET = (course_id) =>  `${API_BASE_VERSION_URL}/courses/${course_id}/subjects.json`;

// For Chapter Get and Post
export const CHAPTER_CREATE = (subject_id) => `${API_BASE_VERSION_URL}/subjects/${subject_id}/chapters.json`;
export const CHAPTER_GET = (subject_id) =>  `${API_BASE_VERSION_URL}/subjects/${subject_id}/chapters.json`;

// For Topic Get and Post
export const TOPIC_CREATE = (chapter_id) => `${API_BASE_VERSION_URL}/chapters/${chapter_id}/topics.json`;
export const TOPIC_GET = (chapter_id) =>  `${API_BASE_VERSION_URL}/chapters/${chapter_id}/topics.json`;

// For FileUpload
export const FILE_UPLOAD = () => `${API_BASE_VERSION_URL}/file_upload`;
export const FILE_UPLOAD_WITH_FORM_DATA = () => `${API_BASE_VERSION_URL}/file_upload`;