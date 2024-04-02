import axios from '../../utils/axios'
import { loadTv } from '../reducers/tvSlice'
export {removeTv} from "../reducers/tvSlice"

export const asyncloadTv = (id) => async (dispatch) => {
    try {
        const details = await axios.get(`/tv/${id}`)
        const recommendations = await axios.get(`/tv/${id}/recommendations`)
        const similar = await axios.get(`/tv/${id}/similar`)
        const externalid = await axios.get(`/tv/${id}/external_ids`)
        const videos = await axios.get(`/tv/${id}/videos`)
        const watchproviders = await axios.get(`/tv/${id}/watch/providers`)
        const translations = await axios.get(`/tv/${id}/translations`)
        let alldetails = {
            detail: details.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(m => m.type === "Trailer"),
            watchproviders: watchproviders.data.results.IN,
            translations: translations.data.translations.map((t)=>t.name)
        }
        dispatch(loadTv(alldetails))
        console.log(alldetails)
    } catch (error) {
        console.log("Error: " + error)
    }

}