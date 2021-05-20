import React, { Component } from "react"
import "./styles.css"

class Author extends Component {
    state = {
        name: "",
        surname: "",
        email: "",
        dateofbirth: "",
        avatar: "",
        avatarFile: null,
        _id: "",
        _createdAt: ""
    }

    render() {
        return <p>Author</p>
    }
}

export default Author
