import axios from axios

axios.defaults.baseURL = process.env.REACT_APP_URL
axios.defaults.timeout = process.env.REACT_APP_TIMEOUT