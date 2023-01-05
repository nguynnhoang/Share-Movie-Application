import { Button } from "reactstrap";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";


const HomePage = () => {
    const { logout } = useContext(AuthContext);

    return <div className="d-flex justify-content-between">
        <h1>Home Page</h1>
        <Button onClick={logout}>Log Out</Button>
    </div>
}
export default HomePage;