import { Outlet, useLocation } from "react-router-dom";
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function generateTitle(pathname) {
    if (pathname === '/register') {
        return "Register"
    }
    else if (pathname === '/login') {
        return "Login"
    }
    else {
        return " "
    }
}

const AuthLayout = () => {
    const { pathname } = useLocation();

    const title = generateTitle(pathname);

    const { login } = useContext(AuthContext);

    return <div>
        <Card>
            <CardHeader className="mb-2">{title}</CardHeader>
            <CardBody>
                <Outlet />
            </CardBody>
            <CardFooter>
                <ButtonGroup>
                    <Button onClick={() => login('google')} color="primary" outline>Google</Button>
                    <Button onClick={() => login('facebook')} color="primary" outline>Facebook</Button>
                    <Button onClick={() => login('twitter')} color="primary" outline>Twitter</Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    </div>
}

export default AuthLayout;