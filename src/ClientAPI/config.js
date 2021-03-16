import axios from 'axios'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
axios.defaults.baseURL = process.env.REACT_APP_URL
axios.defaults.timeout = process.env.REACT_APP_TIMEOUT