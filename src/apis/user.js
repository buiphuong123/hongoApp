// import qs from '@types/query-string';
import { API_ENDPOINT } from '../constants';
import axiosService from '../commons/axiosService';
// import {getTokenApi} from '../screens/tab/home/ExplainScreen';
// http://localhost:3000/tasks
const urlLogin = 'login';
const urlRegister = 'signUp';
const urlGrammar = 'getGrammar';
const urlComment = 'getComment';
const urlLogout = 'logout';
const urlTest = 'test1';
const urlNoti = 'getNotifi';
const urlWord = 'getWord';
const urlgrammarquestion = 'getQuestion';
const urlwordcomment = 'getCommentWord';
// kanji
const urlkanji = 'getKanji';
const urlkanjicomment = 'getKanjiComment';
const urlSchedule = 'getSchedule';
const urlVocabulary = 'getVocabulary';
const urlshareVocabulary = 'getVocabularyShare';
const urlForgotPassword = 'forgot';
//post
const urlPost = 'getPost';
// export const getList = (params = {}) => {
//   let queryParams = '';
//   if (Object.keys(params).length > 0) {
//     queryParams = `?${qs.stringify(params)}`;
//   }
//   return axiosService.get(`${API_ENDPOINT}/${url}${queryParams}`);
// };

// http://localhost:3000/tasks METHOD: POST
export const getGra = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${urlGrammar}`, data);
};

export const login = data => {
  console.log(`${API_ENDPOINT}/${urlLogin}`);
  return axiosService.post(`${API_ENDPOINT}/${urlLogin}`, data);
};

export const register = data => {
    return axiosService.post(`${API_ENDPOINT}/${urlRegister}`, data);
}

export const sendMailPass = data => {
  console.log(`${API_ENDPOINT}/${urlForgotPassword}`);
  return axiosService.post(`${API_ENDPOINT}/${urlForgotPassword}`, data);
}

export const allcomment = data => {
  // console.log('gettokenAPi la', getTokenApi);
  return axiosService.post(`${API_ENDPOINT}/${urlComment}`, data);
}
export const logoutUser = data => {
  return axiosService.post(`${API_ENDPOINT}/${urlLogout}`, data);
}

export const kaka = data => {
  return axiosService.post(`${API_ENDPOINT}/${urlTest}`, data);
}

export const listNotifi = data => {
  return axiosService.post(`${API_ENDPOINT}/${urlNoti}`, data);
}

export const allWord = data => {
  return axiosService.post(`${API_ENDPOINT}/${urlWord}`, data);
}

export const allGrammarQuestion = data => {
  return axiosService.post(`${API_ENDPOINT}/${urlgrammarquestion}`, data);
}

export const allwordcomment = data => {
  return axiosService.post(`${API_ENDPOINT}/${urlwordcomment}`, data);
}
// kanji
export const allKanji = data => {
  return axiosService.post(`${API_ENDPOINT}/${urlkanji}`, data);
}
export const allkanjicomment = data => {
  return axiosService.post(`${API_ENDPOINT}/${urlkanjicomment}`, data);
}
export const allSchedule = data => {
  return axiosService.post(`${API_ENDPOINT}/${urlSchedule}`, data);
}
export const allVocabulary = data => {
  return axiosService.post(`${API_ENDPOINT}/${urlVocabulary}`, data);
}
export const allshareVocabulary = data => {
  return axiosService.post(`${API_ENDPOINT}/${urlshareVocabulary}`, data);
}
export const allPost = data => {
  return axiosService.post(`${API_ENDPOINT}/${urlPost}`, data);
}
// http://localhost:3000/tasks/:id METHOD: PUT
// export const updateTask = (data, taskId) => {
//   return axiosService.put(`${API_ENDPOINT}/${url}/${taskId}`, data);
// };

// http://localhost:3000/tasks/:id METHOD: DELETE
// export const deleteTask = taskId => {
//   return axiosService.delete(`${API_ENDPOINT}/${url}/${taskId}`);
// };
