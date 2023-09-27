export const apiBaseUrlStaging = 'http://138.197.50.162';
// export const API_BASE_URL = 'http://64.227.164.116';
export const API_BASE_URL = 'https://apistage.ashwamedha.net';
export const API_ACCOUNTS = 'accounts';
export const API_LEARNINGS = 'learnings';
export const API_ADMIN = 'admin';
export const API_BASE_VERSION = '/api/v1';

export const API_BASE_VERSION_URL = `${API_BASE_URL}${API_BASE_VERSION}`;

// For Login
export const ADMIN_LOGIN = () =>  `${API_BASE_URL}${API_BASE_VERSION}/users/login`;

// For Courses Get and Post
export const COURSE_CREATE = () => `${API_BASE_VERSION_URL}/courses.json`;
export const COURSE_GET = () => `${API_BASE_VERSION_URL}/courses.json`;
export const COURSE_UPDATE = (course_id) => `${API_BASE_VERSION_URL}/courses/${course_id}.json`;

// For Subject Get and Post
export const SUBJECT_CREATE = (course_id) => `${API_BASE_VERSION_URL}/courses/${course_id}/subjects.json`;
export const SUBJECT_GET = (course_id) =>  `${API_BASE_VERSION_URL}/courses/${course_id}/subjects.json`;
export const SUBJECT_UPDATE = (subject_id) => `${API_BASE_VERSION_URL}/subjects/${subject_id}.json`;

// For Chapter Get and Post
export const CHAPTER_CREATE = (subject_id) => `${API_BASE_VERSION_URL}/subjects/${subject_id}/chapters.json`;
export const CHAPTER_GET = (subject_id) =>  `${API_BASE_VERSION_URL}/subjects/${subject_id}/chapters.json`;
export const CHAPTER_UPDATE = (chapter_id) => `${API_BASE_VERSION_URL}/chapters/${chapter_id}.json`;

// For Topic Get and Post
export const TOPIC_CREATE = (chapter_id) => `${API_BASE_VERSION_URL}/chapters/${chapter_id}/topics.json`;
export const TOPIC_GET = (chapter_id) =>  `${API_BASE_VERSION_URL}/chapters/${chapter_id}/topics.json`;
export const TOPIC_UPDATE = (topic_id) => `${API_BASE_VERSION_URL}/topics/${topic_id}.json`;

// For FileUpload
export const FILE_UPLOAD = () => `${API_BASE_VERSION_URL}/file_upload`;
export const FILE_UPLOAD_WITH_FORM_DATA = () => `${API_BASE_VERSION_URL}/file_upload`;

// For Accounts KYC GET
export const getAccountsKycUrl = () => `${API_BASE_URL}/${API_ACCOUNTS}${API_BASE_VERSION}/kycs.json`;

// For Accounts KYC POST
export const postAccountsKycUrl = () => `${API_BASE_URL}/${API_ACCOUNTS}${API_BASE_VERSION}/kycs.json`;

// For Accounts KYC PUT
export const putAccountsKycUrl = (kycId) => `${API_BASE_URL}/${API_ACCOUNTS}/admin${API_BASE_VERSION}/kycs/${kycId}.json`;

// For Accounts Kyced BANK GET
export const getAccountsKycedBankUrl = (kycId) => `${API_BASE_URL}/${API_ACCOUNTS}${API_BASE_VERSION}/kycs/${kycId}/bank_accounts.json`;

// For Accounts Kyced BANK POST
export const postAccountsKycedBankUrl = (kycId) => `${API_BASE_URL}/${API_ACCOUNTS}${API_BASE_VERSION}/kycs/${kycId}/bank_accounts.json`;

// For Accounts Kyced BANK PUT
export const putAccountsKycedBankUrl = (bankId) => `${API_BASE_URL}/${API_ACCOUNTS}/admin${API_BASE_VERSION}/bank_accounts/${bankId}.json`;

// For Accounts Kyced Address GET
export const getAccountsKycedAddressUrl = (kycId) => `${API_BASE_URL}/${API_ACCOUNTS}${API_BASE_VERSION}/kycs/${kycId}/addresses.json`;

// For Accounts Kyced Address POST
export const postAccountsKycedAddressUrl = (kycId) => `${API_BASE_URL}/${API_ACCOUNTS}${API_BASE_VERSION}/kycs/${kycId}/addresses.json`;

// For Accounts Kyced Address PUT
export const putAccountsKycedAddressUrl = (addressId) => `${API_BASE_URL}/${API_ACCOUNTS}/admin${API_BASE_VERSION}/addresses/${addressId}.json`;

// For Accounts Kyced nominees GET
export const getAccountsKycedNomineesUrl = (kycId) => `${API_BASE_URL}/${API_ACCOUNTS}${API_BASE_VERSION}/kycs/${kycId}/nominees.json`;

// For Accounts Kyced nominees POST
export const postAccountsKycedNomineesUrl = (kycId) => `${API_BASE_URL}/${API_ACCOUNTS}${API_BASE_VERSION}/kycs/${kycId}/nominees.json`;

// For Accounts Kyced nominees PUT
export const putAccountsKycedNomineesUrl = (nomineeId) => `${API_BASE_URL}/${API_ACCOUNTS}/admin${API_BASE_VERSION}/nominees/${nomineeId}.json`;

// For Accounts Onboarding GET
export const getAccountsOnboardingUrl = () => `${API_BASE_URL}/${API_ACCOUNTS}${API_BASE_VERSION}/onboarding.json`;

// For Admin all kyc data GET
export const getAllKycListingUrl = () => `${API_BASE_URL}/${API_ACCOUNTS}/admin${API_BASE_VERSION}/kycs.json`;

export const getKycByIdForAdminUrl = (kycId) => `${API_BASE_URL}/${API_ACCOUNTS}/admin${API_BASE_VERSION}/kycs/${kycId}.json`; 

export const getAddressByIdForAdminUrl = (addressId) => `${API_BASE_URL}/${API_ACCOUNTS}/admin${API_BASE_VERSION}/addresses/${addressId}.json`;

export const getNomineeByIdForAdminUrl = (nomineeId) => `${API_BASE_URL}/${API_ACCOUNTS}/admin${API_BASE_VERSION}/nominees/${nomineeId}.json`;

export const getBankByIdForAdminUrl = (bankId) => `${API_BASE_URL}/${API_ACCOUNTS}/admin${API_BASE_VERSION}/bank_accounts/${bankId}.json`;

// For create question paper POST
export const postQuestionPaperUrl = () => `${API_BASE_URL}/${API_LEARNINGS}/${API_ADMIN}${API_BASE_VERSION}/question_papers.json`;

// For adding questions and answers to paper POST
export const postQuestionAndAnswersToPaperUrl = (paper_id) => `${API_BASE_URL}/${API_LEARNINGS}/${API_ADMIN}${API_BASE_VERSION}/question_papers/${paper_id}/question.json`;

// For getting question paper by id
export const getQuestionPaperByIdUrl = (paper_id) => `${API_BASE_URL}/${API_LEARNINGS}/${API_ADMIN}${API_BASE_VERSION}/question_papers/${paper_id}.json`;

// For creating meeting
export const getMeetingsUrl = () => `${API_BASE_URL}/${API_LEARNINGS}/${API_ADMIN}${API_BASE_VERSION}/meetings.json`;

// For creating meeting
export const postMeetingsUrl = () => `${API_BASE_URL}/${API_LEARNINGS}/${API_ADMIN}${API_BASE_VERSION}/meetings.json`;

// Question paper enum :question_type, %i[samcq mamcq passage one_word]