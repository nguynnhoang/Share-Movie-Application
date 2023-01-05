import { createContext } from "react";
import { config } from "../config";

export const YoutubeContext = createContext({
    shareVideo: (url) => { }
})

const youtubeUrlPattern =  /^((http|https)\:\/\/)?(www\.youtube\.com|youtu\.?be)\/((watch\?v=)?([a-zA-Z0-9]{11}))(&.*)*$/

const YoutubeProvider = ({ children }) => {

    const getVideoIdFromYoutubeUrl = (url) => {
        // Promise is a constructor
        return new Promise((resolve, reject) => {
            const result = url.match(youtubeUrlPattern)
            if (result === null) reject(new Error('Youtube Url is not valid'))
            resolve(result[6])
        })
    }

    const validateVideoId = (videoId) => {
        
        return new Promise((resolve, reject) => {
            fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${config.youtubeApiKey}`)
                .then((response) => response.json())
                .then(data => {
                    //console.log(data) 
                    // data trả về đầy đủ thông tin của video
                    if (data.items.length === 0) reject(new Error('Youtube video not found'))
                    resolve(data)
                })
        })
    }

    const shareVideo = async (url) => {
        //console.log(url)
        const videoId = await getVideoIdFromYoutubeUrl(url)
        const youtubeData = await validateVideoId(videoId)
        //console.log(videoId)
        console.log(youtubeData)
    }

    const value = {shareVideo}

    return <YoutubeContext.Provider value={value}>
        { children }
    </YoutubeContext.Provider>
}

export default YoutubeProvider