import React, { Component } from "react"
import { Row, Col } from "react-bootstrap"
import BlogItem from "../blog-item"

export default class BlogList extends Component {
    state = {
        posts: []
    }

    componentDidMount = async () => this.setState({ posts: await this.props.crud.getAll() })

    render() {
        return (
            <Row>
                {this.state.posts
                    .slice(0)
                    .reverse()
                    .map((post, index) => (
                        <Col md={4} key={index} style={{ marginBottom: 50 }}>
                            <BlogItem {...post} />
                        </Col>
                    ))}
            </Row>
        )
    }
}
