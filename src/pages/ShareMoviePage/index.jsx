import { useContext, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { YoutubeContext } from "../../contexts/YoutubeContext";



//validate url valid ? id video : error
//validate video id (call api to youtube to validate)
const ShareMoviePage = () => {

    const { shareVideo } = useContext(YoutubeContext)

    const [formValue, setFormValue] = useState({
        youtubeURL: ''
    })

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormValue((prev) => ({ ...prev, [name]: value }))
        console.log(formValue)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        shareVideo(formValue.youtubeURL)
    }

    return (
        <Row className="justify-content-center">
            <Col md={6} xs={8}>
                <Card>
                    <CardHeader>Share a youtube video</CardHeader>
                    <CardBody>
                        <Form onSubmit={onSubmit}>
                        <FormGroup row>
                            <Label for="youtubeURL" sm={3}>Youtube URL</Label>
                            <Col sm={8}>
                                <Input
                                    id="youtubeURL"
                                    name="youtubeURL"
                                    placeholder="Youtube url ..."
                                    type="url"
                                    value={formValue.youtubeURL}
                                    onChange={onChange}
                                />

                                <Button color="success" block className="mt-2">
                                    Share
                                </Button>
                            </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default ShareMoviePage