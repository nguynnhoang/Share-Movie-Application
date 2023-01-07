import { useContext, useState } from "react";
import { Alert, Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row, Spinner } from "reactstrap"
import { YoutubeContext } from "../../contexts/YoutubeContext";



//validate url valid ? id video : error
//validate video id (call api to youtube to validate)
const ShareMoviePage = () => {

    const { shareVideo } = useContext(YoutubeContext)

    const [err, setError] = useState('')

    const [formValue, setFormValue] = useState({
        youtubeURL: ''
    })

    const [submitting, setSubmitting] = useState(false)

  

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormValue((prev) => ({ ...prev, [name]: value }))
        console.log(formValue)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (err) setError('')
        setSubmitting(true)
        setSuccessful('Successful share')
        try {
            await shareVideo(formValue.youtubeURL)
            setFormValue({
                youtubeURL: ''
            })
        } catch (error) {
            setError(error.message)
            //console.log(error.message)
            setSubmitting(false)
            setSuccessful('Unsuccessful share')
        } finally {
            setSubmitting(false)
            setSuccessful('Successful share')
        }
    }

    return (
        <Row className="justify-content-center">
            <Col md={6} xs={8}>
                <Card>
                    <CardHeader>Share a youtube video</CardHeader>
                    <CardBody>
                        <Form onSubmit={onSubmit}>
                            {err && <Alert color="danger">{err}</Alert>}
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
                                    <Button disabled={submitting} color="success" block className="mt-2">
                                        Share {submitting && <Spinner size={'sm'}/>}
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