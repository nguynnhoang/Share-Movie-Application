import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import errorMessage from "../../common/errorMessage";
import { AuthContext } from "../../contexts/AuthContext";

const RegisterPage = () => {
    const { register } = useContext(AuthContext);
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        const { email, password, confirmPassword } = formValue;
        if (error) setError('');

        if (password !== confirmPassword) {
            setError('Password confirmation not match');
            return;
        }

        try {
            await register(email, password);
        } catch (e) {
            const errorCode = e.code;
            console.log(e);
            const errorMes = errorMessage(errorCode);
            setError(errorMes);
        }

    }

    const onChange = (e) => {
        const { name, value } = e.target;
        // Dấu ngoặc tròn thay thế cho chữ return
        setFormValue((prev) => ({ ...prev, [name]: value }))
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
        {' '}
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
        <FormGroup floating>
            <Input
                onChange={onChange}
                id="exampleConfirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
            />
            <Label for="exampleConfirmPassword">
                Confirm Password
            </Label>
        </FormGroup>
        <Button outline color="info">
            Register
        </Button>
        <div className="mt-2">
            Already have an account? <Link to='/login'>Login</Link>
        </div>
    </Form>
}
export default RegisterPage;