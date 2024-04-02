import axios from '../../utils/axios'
import { loadMovie } from '../reducers/movieSlice'
export {removeMovie} from "../reducers/movieSlice"

export const asyncloadMovie = (id) => async (dispatch) => {
    try {
        const details = await axios.get(`/movie/${id}`)
        const recommendations = await axios.get(`/movie/${id}/recommendations`)
        const similar = await axios.get(`/movie/${id}/similar`)
        const externalid = await axios.get(`/movie/${id}/external_ids`)
        const videos = await axios.get(`/movie/${id}/videos`)
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`)
        const translations = await axios.get(`/movie/${id}/translations`)
        let alldetails = {
            detail: details.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(m => m.type === "Trailer"),
            watchproviders: watchproviders.data.results.IN,
            translations: translations.data.translations.map((t)=>t.name)
        }
        dispatch(loadMovie(alldetails))
        console.log(alldetails)
    } catch (error) {
        console.log("Error: " + error)
    }

}