import axios from axios

console.log(axios)

const call = (request) => {
    try {
        return await request()
    } catch (error) {
        console.log(error)
    }
}
const get = async (path, item = path, value) => 
    await call(() => axios.get(`/${path}?id${item}=${value}`))

const post = async (path, entity) =>
    await call(() => axios.post(`/${path}`, {entity}))
