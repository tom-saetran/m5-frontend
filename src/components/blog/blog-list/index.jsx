import React, { Component } from "react"
import { Row, Col } from "react-bootstrap"
import BlogItem from "../blog-item"

export default class BlogList extends Component {
    render() {
        return (
            <Row>
                {this.props.blogPosts &&
                    this.props.blogPosts.map(post => (
                        <Col md={4} style={{ marginBottom: 50 }}>
                            <BlogItem key={post.title} {...post} />
                        </Col>
                    ))}
            </Row>
        )
    }
}
