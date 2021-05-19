import React, { Component } from "react"
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"
import { Container, Form, Button, Col, Row } from "react-bootstrap"
import "./styles.css"

export default class NewBlogPost extends Component {
    state = {
        title: "",
        category: "Category 1",
        content: "",
        readTime: {
            value: 0,
            unit: ""
        },
        cover: ""
    }

    changeTitle = e => this.setState({ title: e.target.value })
    changeCategory = e => this.setState({ category: e.target.value })
    changeContent = value => this.setState({ content: value })
    changeCover = e => this.setState({ cover: e.target.value })
    changeReadTimeNumber = e => this.setState({ readTime: { value: e.target.value, unit: this.state.readTime.unit } })
    changeReadTimeUnit = e => this.setState({ readTime: { unit: e.target.value, value: this.state.readTime.value } })

    submit = e => {
        e.preventDefault()
        this.props.post(this.state)
    }

    render() {
        return (
            <Container className="new-blog-container">
                <Form className="mt-5" onSubmit={e => this.submit(e)}>
                    <Form.Group controlId="blog-form" className="mt-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={this.state.title} onChange={e => this.changeTitle(e)} size="lg" placeholder="Title" />
                    </Form.Group>
                    <Form.Group controlId="blog-readtime" className="mt-3">
                        <Form.Label>Time to read</Form.Label>
                        <Row className="align-items-center">
                            <Col xs={6} sm={5} md={3} lg={2}>
                                <Form.Control value={this.state.readTime.value} onChange={e => this.changeReadTimeNumber(e)} size="lg" type="number" />
                            </Col>
                            <Col>
                                <Form.Control onChange={e => this.changeReadTimeUnit(e)} size="lg" as="select">
                                    <option value="minutes">Minutes</option>
                                    <option value="hours">Hours</option>
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="blog-category" className="mt-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control onChange={e => this.changeCategory(e)} size="lg" as="select" selected="category1">
                            <option>Category 1</option>
                            <option>Category 2</option>
                            <option>Category 3</option>
                            <option>Category 4</option>
                            <option>Category 5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="blog-category" className="mt-3">
                        <Form.Label>Cover Image URL</Form.Label>
                        <Form.Control value={this.state.cover} onChange={e => this.changeCover(e)} size="lg" type="input" />
                    </Form.Group>
                    <Form.Group controlId="blog-content" className="mt-3">
                        <Form.Label>Blog Content</Form.Label>
                        <ReactQuill value={this.state.content} onChange={this.changeContent} className="new-blog-content" />
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
