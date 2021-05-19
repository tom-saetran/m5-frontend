import React, { Component } from "react"
import { Row, Col } from "react-bootstrap"
import BlogItem from "../blog-item"

export default class BlogList extends Component {
    render() {
        return (
            <Row>
                {this.props.blogPosts &&
                    this.props.blogPosts.map((post, index) => (
                        <Col md={4} key={index} style={{ marginBottom: 50 }}>
                            <BlogItem {...post} />
                        </Col>
                    ))}
            </Row>
        )
    }
}
