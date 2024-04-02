import axios from 'axios'
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODY2MWViZGVjOGUwZDZhNzViMjVkOGMxMmFmYWI5MiIsInN1YiI6IjY2MDZhNTBmMDIxY2VlMDE3YzQ4M2I0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YiexshZ2qm3-5_hB_kXU4EhdgkEf3UZPJYX2_WaH7iI"
    }
})
export default instance;