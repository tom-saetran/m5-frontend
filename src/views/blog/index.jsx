import React, { Component } from "react"
import { Container, Image } from "react-bootstrap"
import { withRouter } from "react-router"
import BlogAuthor from "../../components/blog/blog-author"
import "./styles.css"
class Blog extends Component {
    state = {
        blog: null,
        loading: true
    }

    componentDidMount = async () => {
        this.setState({ blog: await this.props.get(this.props.match.params.id) })
    }

    render() {
        return (
            this.state.blog && (
                <div className="blog-details-root">
                    <Container>
                        <Image className="blog-details-cover" src={this.state.blog.cover} fluid />
                        <h1 className="blog-details-title">{this.state.blog.title}</h1>

                        <div className="blog-details-container">
                            <div className="blog-details-author">
                                <BlogAuthor {...this.state.blog.author} />
                            </div>
                            <div className="blog-details-info">
                                <div>{this.state.blog.createdAt}</div>
                                <div>{`${this.state.blog.readTime.value} ${this.state.blog.readTime.unit} read`}</div>
                            </div>
                        </div>

                        <div dangerouslySetInnerHTML={{ __html: this.state.blog.content }}></div>
                    </Container>
                </div>
            )
        )
    }
}

export default withRouter(Blog)
