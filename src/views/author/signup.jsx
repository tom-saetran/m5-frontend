import React, { Component } from "react"
import "react-quill/dist/quill.snow.css"
import { Container, Form, Button, Col, Row } from "react-bootstrap"
import "./styles.css"

class AuthorSignUp extends Component {
    state = {
        name: "",
        surname: "",
        email: "",
        dateofbirth: "",
        avatar: "",
        avatarFile: null
    }

    changeName = e => this.setState({ name: e.target.value })
    changeSurname = e => this.setState({ surname: e.target.value })
    changeEmail = e => this.setState({ email: e.target.value })
    changeDateOfBirth = e => this.setState({ dateofbirth: e.target.value })
    changeAvatar = e => this.setState({ avatar: e.target.value })
    changeAvatarFile = e => this.setState({ avatarFile: e.target.files[0] })

    submit = async e => {
        e.preventDefault()

        // TODO: send data
    }

    render() {
        return (
            <Container className="new-blog-container">
                <Form className="mt-5" onSubmit={e => this.submit(e)}>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>First Name *</Form.Label>
                                <Form.Control required value={this.state.name} onChange={e => this.changeName(e)} size="lg" placeholder="First name" />
                            </Col>
                            <Col>
                                <Form.Label>Last Name *</Form.Label>
                                <Form.Control required value={this.state.surname} onChange={e => this.changeSurname(e)} size="lg" placeholder="Last name" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group></Form.Group>

                    <Form.Group controlId="blog-form" className="mt-3">
                        <Row>
                            <Col xs={7}>
                                <Form.Label>Email *</Form.Label>
                                <Form.Control required value={this.state.email} onChange={e => this.changeEmail(e)} size="lg" placeholder="Email" type="email" />
                            </Col>
                            <Col xs={5}>
                                <Form.Label>Date of Birth *</Form.Label>
                                <Form.Control required onChange={e => this.changeDateOfBirth(e)} size="lg" type="date" min="1900-01-01" max="2020-01-01" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col xs={7}>
                                <Form.Label>Avatar URL</Form.Label>
                                <Form.Control value={this.state.avatar} onChange={e => this.changeAvatar(e)} size="lg" placeholder="URL" type="url" />
                            </Col>
                            <Col xs={5}>
                                <Form.Label>or Upload...</Form.Label>
                                <Form.Control value={this.state.avatarFile} onChange={e => this.changeAvatarFile(e)} size="lg" type="file" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="d-flex mt-3 justify-content-end">
                        <Button type="reset" size="lg" variant="outline-dark">
                            Reset
                        </Button>
                        <Button type="submit" size="lg" variant="dark" style={{ marginLeft: "1em" }}>
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

export default AuthorSignUp
