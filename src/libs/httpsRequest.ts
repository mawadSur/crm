import axios from 'axios';

const httpRequest = axios.create();
httpRequest.defaults.timeout = 60000; // 1 minute
export default httpRequest;
