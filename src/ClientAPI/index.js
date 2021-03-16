import axios from 'axios'
import './config'

const call = async request => {
    try {
        const response = await request()
        return response
    } catch (error) {
        console.log({error})
    }
}

const api = {
    get: async (path, itemId, value) => {
        return (itemId && value) 
        ? await call(() => axios.get(`/${path}/${itemId}Id=${value}`))
            : await call(() => axios.get(`/${path}`))
        },
    post: async (path, entity) => await call(() => axios.post(`/${path}`, {entity})),
    put: async (path, entity) => await call(() => axios.put(`/${path}`, {entity})),
    delete: async (path, item = path, id) => await call(() => axios.delete(`${path}/${item}Id=${id}`))
}

export default api