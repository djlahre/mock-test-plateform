import http, { baseUrl } from "./http";

const getAssessments = async (type) => {
  const response = await http.get(`${baseUrl}/${type}-assessments`);
  if (response.ok) return await response.json();
  return null;
};

const getAssessmentInfo = async (type, id) => {
  const response = await http.get(`${baseUrl}/${type}-assessments/${id}`);
  if (response.ok) return await response.json();
  return null;
};

const attemptAssessment = async (type, id) => {
  const response = await http.get(`${baseUrl}/assessment/${type}/${id}`);
  if (response.ok) return await response.json();
  return null;
};

const submitResult = async (values) => {
  const response = await http.post(`${baseUrl}/assessment/results`, values);
  if (response.ok) return await response.json();
  return null;
};

const getResults = async (type) => {
  const response = await http.get(`${baseUrl}/assessment/results/${type}`);
  if (response.ok) return await response.json();
  return null;
};

const getResult = async (id) => {
  const response = await http.get(`${baseUrl}/assessment/results/${id}`);
  if (response.ok) return await response.json();
  return null;
};

const reportQuestion = async (values) => {
  const response = await http.post(`${baseUrl}/reported-questions`, values);
  if (response.ok) return await response.json();
  return null;
};

const studentService = {
  getAssessments,
  getAssessmentInfo,
  attemptAssessment,
  submitResult,
  getResults,
  getResult,
  reportQuestion,
};

export default studentService;
