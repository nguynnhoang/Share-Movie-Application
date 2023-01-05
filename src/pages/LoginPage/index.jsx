import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import errorMessage from "../../common/errorMessage";
import { AuthContext } from "../../contexts/AuthContext";

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('');


    const onChange = (e) => {
        const { name, value } = e.target;
        // Dấu ngoặc tròn thay thế cho chữ return
        setFormValue((prev) => ({ ...prev, [name]: value }))

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formValue;
        if (error) setError('');

        try {
            await login(null, email, password)
        } catch (e) {
            const errorCode = e.code;
            const errorMes = errorMessage(errorCode);
            setError(errorMes);
        }

    }

    return <Form onSubmit={onSubmit}>
        {error && <Alert color="danger">{error}</Alert>}
        <FormGroup floating>
            <Input
                onChange={onChange}
                id="exampleEmail"
                name="email"
                placeholder="Email"
                type="email"
            />
            <Label for="exampleEmail">
                Email
            </Label>
        </FormGroup>
        <FormGroup floating>
            <Input
                onChange={onChange}
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="password"
            />
            <Label for="examplePassword">
                Password
            </Label>
        </FormGroup>
        <Button outline color="success">
            Login
        </Button>
        <div className="mt-2">
            Don't have an account? <Link to='/register'>Create Account</Link>
        </div>
    </Form>
}
export default LoginPage;