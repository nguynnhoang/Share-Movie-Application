import { createContext } from "react";

export const YoutubeContext = createContext({
    shareVideo: (url) => { }
})

const youtubeUrlPattern =  /^((http|https)\:\/\/)?(www\.youtube\.com|youtu\.?be)\/((watch\?v=)?([a-zA-Z0-9]{11}))(&.*)*$/

const YoutubeProvider = ({ children }) => {

    const getVideoIdFromYoutubeUrl = (url) => {
        console.log(url.match(youtubeUrlPattern))
    }

    const shareVideo = (url) => {
        console.log(url)
        getVideoIdFromYoutubeUrl(url)
    }

    const value = {shareVideo}

    return <YoutubeContext.Provider value={value}>
        { children }
    </YoutubeContext.Provider>
}

export default YoutubeProvider