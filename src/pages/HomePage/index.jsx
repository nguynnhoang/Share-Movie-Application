import { Button } from "reactstrap";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { YoutubeContext } from "../../contexts/YoutubeContext";


const HomePage = () => {
    // const { logout } = useContext(AuthContext);
    // const { createUser } = useContext(AuthContext);
    const { getYoutubeVideos } = useContext(YoutubeContext)
    useEffect(() => {
        getYoutubeVideos()
    }, [])
    return <div className="d-flex justify-content-between">
        <h1>Home Page</h1>
        {/* <Button onClick={logout}>Log Out</Button>
        <Button onClick={createUser}>Create user</Button> */}
    </div>
} 
export default HomePage;