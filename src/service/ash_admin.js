import axios from 'axios';
import { CHAPTER_CREATE, CHAPTER_GET, COURSE_CREATE, COURSE_GET, SUBJECT_CREATE, SUBJECT_GET, TOPIC_CREATE, TOPIC_GET, ADMIN_LOGIN, FILE_UPLOAD, FILE_UPLOAD_WITH_FORM_DATA, TOPIC_UPDATE, CHAPTER_UPDATE, SUBJECT_UPDATE, COURSE_UPDATE } from '../config/servers/api';

// let instance;
// class ApiAdminService {
//   constructor() {
//     if (instance) {
//       throw new Error("New instance cannot be created!!");
//     }

//     instance = this;
//   }

  
// }

// let ApiAdminServiceInstance = Object.freeze(new ApiAdminService());

// export default ApiAdminServiceInstance;

// Local Storage
export const storageSetItem = (key, value) => localStorage.setItem(key, value);
export const storageGetItem = (key) => localStorage.getItem(key);
export const storageClear = () => localStorage.clear();
export const storageRemoveItem = (key) => localStorage.removeItem(key);

const getHeaderOptions = () => (
  {
    "Content-type": "application/json",
    Authorization: `Bearer ${storageGetItem('token')}`,
  }
)

// makeRequest
export const makeRequest = async (methodType, uri, payload = {}) => {
  try {
    console.log(`[service]::[makeRequest]::[method:: ${methodType}]::[uri:: ${uri}]::[payload:: ${JSON.stringify(payload)}]`);
    let url = uri;

    const headers = getHeaderOptions();

    let response = await axios({
      method: methodType,
      url: url,
      headers: headers,
      data: payload
    });
    return response.data;
  } catch (error) {
    console.log(`[service]::[makeRequest]::[method:: ${methodType}]::[url:: ${uri}]::[payload:: ${payload}]:: [err: ${error}]`);
    return {};
  }
}

// Login
export const postLogin = async (payload) => {
  try {
    let response = await axios({
      method: 'post',
      url: ADMIN_LOGIN(),
      headers: {
        "Content-type": "application/json"
      },
      data: payload
    })
    console.log('[postLogin]::', response, response.data);
    response = response.data
    if(response.success) {
      const { attributes } = response.data
      storageSetItem('users', JSON.stringify({
        id: attributes.id,
        full_name: attributes.full_name
      }))
      storageSetItem('token', attributes.token);
      return response.data
    } else {
      return null
    }
  } catch (error) {
    console.log('[error]::[postLogin]', error.response)
    return null
  }
}

// Course API CALL
export const createCourse = async (payload) => {
  try {
    let response = await axios({
      method: 'post',
      url: COURSE_CREATE(),
      headers: getHeaderOptions(),
      data: payload,
    });
    console.log('[createCourse]::', response);
    response = response.data
    if(response.success === true) {
      return response.data
    } else {
      return null
    }
  } catch (error) {
    console.log('[error]::[createCourse]', error.response)
    return null
  }
}

export const getCourse = async () => {
  const response  = await makeRequest('get', COURSE_GET());
  if(response.success === true) {
    return response.data
  } else {
    return null
  }
}

export const putCourse = async (course_id, payload) => {
  const response = await makeRequest('put', COURSE_UPDATE(course_id), payload)
  if(response.success === true) {
    return response.data
  } else {
    return null
  }
}

// Subject API CALL
export const createSubject = async (course_id, payload) => {
  try {
    let response = await axios({
      method: 'post',
      url: SUBJECT_CREATE(course_id),
      headers: getHeaderOptions(),
      data: payload,
    });
    console.log('[createSubject]::', response);
    response = response.data
    if(response.success === true) {
      return response.data
    } else {
      return null
    }
  } catch (error) {
    console.log('[error]::[createSubject]', error.response)
    return null
  }
}

export const getSubject = async (course_id) => {
  const response = await makeRequest('get', SUBJECT_GET(course_id));
  if(response.success === true) {
    return response.data
  } else {
    return null
  }
}

export const putSubject = async (subject_id, payload) => {
  const response = await makeRequest('put', SUBJECT_UPDATE(subject_id), payload)
  if(response.success === true) {
    return response.data
  } else {
    return null
  }
}

// Chapter API CALL
export const createChapter = async (subject_id, payload) => {
  try {
    let response = await axios({
      method: 'post',
      url: CHAPTER_CREATE(subject_id),
      headers: getHeaderOptions(),
      data: payload
    });
    console.log('[createChapter]::', response);
    response = response.data
    if(response.success === true) {
      return response.data
    } else {
      return null
    }
  } catch (error) {
    console.log('[error]::[createChapter]', error.response)
    return null
  }
}

export const getChapter = async (subject_id) => {
  const response = await makeRequest('get', CHAPTER_GET(subject_id));
  if(response.success === true) {
    return response.data
  } else {
    return null
  }
}

export const putChapter = async (chapter_id, payload) => {
  const response = await makeRequest('put', CHAPTER_UPDATE(chapter_id), payload)
  if(response.success === true) {
    return response.data
  } else {
    return null
  }
}

// Topic API CALL
export const createTopic = async (chapter_id, payload) => {
  try {
    let response = await axios({
      method: 'post',
      url: TOPIC_CREATE(chapter_id),
      headers: getHeaderOptions(),
      data: payload
    });
    console.log('[createChapter]::', response);
    response = response.data
    if(response.success === true) {
      return response.data
    } else {
      return null
    }
  } catch (error) {
    console.log('[error]::[createChapter]', error.response)
    return null
  }
}

export const getTopic = async (chapter_id) => {
  const response = await makeRequest('get', TOPIC_GET(chapter_id));
  if(response.success === true) {
    return response.data
  } else {
    return null
  }
}

export const putTopic = async (topic_id, payload) => {
  const response = await makeRequest('put', TOPIC_UPDATE(topic_id), payload)
  if(response.success === true) {
    return response.data
  } else {
    return null
  }
}

// UPLOAD FILE TO GET PRESIGNEDURL
// {
//   "file": {
//     "name": "image",
//     "location": "/subject_logo",
//     "type": "png"
//   }
// }

// Creating File Location
export const postFileUpload = async (payload) => {
  try {
    let response = await axios({
      method: 'post',
      url: FILE_UPLOAD(),
      headers: getHeaderOptions(),
      data: payload
    });
    console.log('[postFileUpload]::', response);
    response = response.data
    if(response.success) {
      return response
    } else {
      return null
    }
  } catch (error) {
    console.log('[error]::[postFileUpload]', error.response)
    return null
  }
}

// File Uploaded to the location
export const putFileUpload = async (axios_url, payload, handleUploadProgress = ()=>{}, content_type = "image/*") => {
  try {
    // let data = new FormData();
    // data.append('file', payload);

    // const fileReader = await convertToBinary(payload)
    console.log('[putFileUpload]::', axios_url, payload)
    return axios({
      method: 'put',
      url: axios_url,
      headers: {
        "Content-type": content_type,
        "x-amz-acl": "public-read",
      },
      data: payload,
      onUploadProgress: handleUploadProgress
    });
  } catch (error) {
    console.log('[error]::[putFileUpload]', error.response)
    return null
  }
}


function convertToBinary(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      resolve(reader.result);
    }
    reader.onerror = reject;
  });
}
