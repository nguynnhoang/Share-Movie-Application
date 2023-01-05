import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { Card, CardBody, Col, Container, Form, FormGroup, Row, Label, Input, Button } from "reactstrap"
import Avatar from "../../components/Avatar";
import { AuthContext } from "../../contexts/AuthContext";


const UpdateProfilePage = () => {
    const { updateProfile } = useContext(AuthContext);
    const { currentUser } = useContext(AuthContext);

    const [formValue, setFormValue] = useState({
        displayName: '',
        photo: null,
    });

    const onChangeImage = (file) => {
        setFormValue((prev) => ({ ...prev, photo: file }))
    }

    console.log(formValue);

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormValue((prev) => ({ ...prev, [name]: value }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await updateProfile(formValue.displayName, formValue.photo);
    }

    if (currentUser.displayName && currentUser.photoURL) return <Navigate to='/' />

    return <Container>
        <Row>
            <Col>
                <Card>
                    <CardBody>
                        <Form onSubmit={onSubmit}>
                            <Avatar onChangeImage={onChangeImage} />
                            <FormGroup>
                                <Input
                                    id="displayNameId"
                                    name="displayName"
                                    placeholder="Input display name"
                                    type="text"
                                    onChange={onChange}
                                    value={formValue.displayName}
                                />
                                <Button className="mt-3">
                                    Update
                                </Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
}

export default UpdateProfilePage