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
            value: 1,
            unit: "minutes"
        },
        cover: "",
        coverFile: null
    }

    changeTitle = e => this.setState({ title: e.target.value })
    changeCategory = e => this.setState({ category: e.target.value })
    changeContent = value => this.setState({ content: value })
    changeCover = e => this.setState({ cover: e.target.value })
    changeCoverFile = e => this.setState({ coverFile: e.target.files[0] })
    changeReadTimeNumber = e => this.setState({ readTime: { value: parseInt(e.target.value), unit: this.state.readTime.unit } })
    changeReadTimeUnit = e => this.setState({ readTime: { unit: e.target.value, value: 1 } })

    submit = async e => {
        e.preventDefault()
        let response = await this.props.post(this.state)
        response && this.props.history.push("blog/" + (await response._id))
    }

    render() {
        return (
            <Container className="new-blog-container">
                <Form className="mt-5" onSubmit={e => this.submit(e)}>
                    <Form.Group controlId="blog-form" className="mt-3">
                        <Form.Label>Title *</Form.Label>
                        <Form.Control required value={this.state.title} onChange={e => this.changeTitle(e)} size="lg" placeholder="Title" />
                    </Form.Group>
                    <Form.Group controlId="blog-readtime" className="mt-3">
                        <Form.Label>Time to read *</Form.Label>
                        <Row className="align-items-center">
                            <Col xs={6} sm={5} md={3} lg={2}>
                                {this.state.readTime.unit === "minute" ? (
                                    <Form.Control required value={this.state.readTime.value} onChange={e => this.changeReadTimeNumber(e)} size="lg" as="select">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>5</option>
                                        <option>10</option>
                                        <option>15</option>
                                        <option>20</option>
                                        <option>30</option>
                                        <option>40</option>
                                        <option>50</option>
                                    </Form.Control>
                                ) : (
                                    <Form.Control required value={this.state.readTime.value} onChange={e => this.changeReadTimeNumber(e)} size="lg" as="select">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option value="5">5+</option>
                                    </Form.Control>
                                )}
                            </Col>
                            <Col>
                                <Form.Control required onChange={e => this.changeReadTimeUnit(e)} size="lg" as="select">
                                    <option value="minute">Minutes</option>
                                    <option value="hour">Hours</option>
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="blog-category" className="mt-3">
                        <Form.Label>Category *</Form.Label>
                        <Form.Control required onChange={e => this.changeCategory(e)} size="lg" as="select" selected="category1">
                            <option>Personal Blog</option>
                            <option>Fake News</option>
                            <option>Click Bait</option>
                            <option>Propaganda</option>
                            <option>Sponsored Content</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="blog-category" className="mt-3">
                        <Row>
                            <Col xs={7}>
                                <Form.Label>Cover Image URL</Form.Label>
                                <Form.Control value={this.state.cover} onChange={e => this.changeCover(e)} size="lg" type="input" />
                            </Col>
                            <Col xs={5}>
                                <Form.Label>or Upload...</Form.Label>
                                <Form.Control onChange={e => this.changeCoverFile(e)} size="lg" type="file" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="blog-content" className="mt-3">
                        <Form.Label>Blog Content *</Form.Label>
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
