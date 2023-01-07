import { addDoc, collection, getDoc, getDocs, setDoc } from "firebase/firestore";
import { createContext, useContext } from "react";
import { config } from "../config";
import { db } from "../lib/firebase";
import { AuthContext } from "./AuthContext";

export const YoutubeContext = createContext({
    shareVideo: (url) => { },
    getYoutubeVideos: () => {}
})

const youtubeUrlPattern =  /^((http|https)\:\/\/)?(www\.youtube\.com|youtu\.?be)\/((watch\?v=)?([a-zA-Z0-9]{11}))(&.*)*$/

const YoutubeProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext)

    const getYoutubeVideos = async () => {
        const videosRef = collection(db, 'videos')
        const querySnapshot = await getDocs(videosRef)
        const youtubeData = []
        querySnapshot.forEach((doc) => {
            youtubeData.push(doc.data())
        })
        const videoIds = youtubeData.map((item) => item.videoId)
        const videos = validateVideoId(videoIds)
    }
    const getVideoIdFromYoutubeUrl = (url) => {
        // Promise is a constructor
        return new Promise((resolve, reject) => {
            const result = url.match(youtubeUrlPattern)
            if (result === null) reject(new Error('Youtube Url is not valid'))
            resolve(result[6])
        })
    }

    const validateVideoId = (videoId) => {
        let idParams
        if (typeof videoId === 'string') {
            idParams = videoId
        } else {
            idParams = videoId.map(item => `&id=${item}`)
            console.log(idParams.join(''))
        }
        return new Promise((resolve, reject) => {
            fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${config.youtubeApiKey}`)
                .then((response) => response.json())
                .then(data => {
                    //console.log(data) 
                    // data trả về đầy đủ thông tin của video
                    if (data.items.length === 0) reject(new Error('Youtube video not found'))
                    resolve(data)
                }).catch(e => {
                    console.log(e)
                })
        })
    }

    const shareVideo = async (url) => {
        //console.log(url)
        const videoId = await getVideoIdFromYoutubeUrl(url)
        const youtubeData = await validateVideoId(videoId)
        //console.log(videoId)
        console.log(youtubeData)
        const videoRef = collection(db, 'videos')
        const data = {
            videoId,
            createBy: currentUser.uid
        }
        await addDoc(videoRef, data)
    }

    const value = {shareVideo, getYoutubeVideos}

    return <YoutubeContext.Provider value={value}>
        { children }
    </YoutubeContext.Provider>
}

export default YoutubeProvider