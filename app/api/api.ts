// const BASE_URL = 'http://192.168.68.215:8080';
const BASE_URL = 'http://10.1.6.72:8080';

export const API_URL = {
    SIGN_IN: BASE_URL + '/api/auth/signin',
    SIGN_UP: BASE_URL + '/api/auth/signup',
    All_CHATS: BASE_URL + '/api/chat/all',
    USER_DETAILS: BASE_URL + '/api/user',
    ALL_CHAT_MESSAGES: BASE_URL + '/api/message/all/',
    GET_ANSWER: BASE_URL + '/api/message',
    UPDATE_USERNAME: BASE_URL + '/api/user/username/',
    UPDATE_EMAIL: BASE_URL + '/api/user/email/',
    UPDATE_PASSWORD: BASE_URL + '/api/user/password/',
};
