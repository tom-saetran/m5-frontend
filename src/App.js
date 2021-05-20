import React from "react"
import NavBar from "./components/navbar"
import Footer from "./components/footer"
import Home from "./views/home"
import Blog from "./views/blog"
import NewBlogPost from "./views/new"
import { BrowserRouter, HashRouter, Route } from "react-router-dom"
import AuthorSignUp from "./views/author/signup"
import Author from "./views/author"

const Router = process.env.NODE_ENV === "production" ? HashRouter : BrowserRouter

class App extends React.Component {
    state = {
        endpoint: "http://localhost:8888/",
        signedin: false
    }

    crud_authors = {
        get: async id => {
            let results
            try {
                if (id === "" || id === undefined || id === null) throw new Error("id must be present")
                results = await fetch(this.state.endpoint + "authors/" + id)
                if (!results.ok) throw new Error("got data in return but the ok flag is not true! response: " + results)
                results = await results.json()
            } catch (error) {
                console.error(error)
                return null
            }
            return await results
        },

        getAll: async () => {
            let results
            try {
                results = await fetch(this.state.endpoint + "authors/")
                if (!results.ok) throw new Error("got data in return but the ok flag is not true! response: " + results)
                results = await results.json()
            } catch (error) {
                console.error(error)
                return null
            }
            return await results
        },

        post: async data => {
            let results
            try {
                if (typeof data !== "object") throw new Error("data must be an object")
                results = await fetch(this.state.endpoint + "authors/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                if (!results.ok) throw new Error("got data in return but the ok flag is not true! response: " + results)
                if (results.status !== 201) return false
                results = await results.json()
            } catch (error) {
                console.error(error)
                return null
            }
            return await results
        },

        put: async (id, data) => {
            let results
            try {
                if (id === "" || id === undefined || id === null) throw new Error("id must be present")
                if (typeof data !== "object") throw new Error("data must be an object")
                results = await fetch(this.state.endpoint + "authors/" + id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                if (!results.ok) throw new Error("got data in return but the ok flag is not true! response: " + results)
                results = await results.json()
            } catch (error) {
                console.error(error)
                return null
            }
            return await results
        },

        delete: async id => {
            let results
            try {
                if (id === "" || id === undefined || id === null) throw new Error("id must be present")
                results = await fetch(this.state.endpoint + "authors/" + id, {
                    method: "DELETE"
                })
                if (!results.ok) throw new Error("got data in return but the ok flag is not true! response: " + results)
                results = await results.json()
            } catch (error) {
                console.error(error)
                return null
            }
            return await results
        },

        avatar: async () => {} // TODO
    }

    crud_blogposts = {
        get: async id => {
            let results
            try {
                if (id === "" || id === undefined || id === null) throw new Error("id must be present")
                results = await fetch(this.state.endpoint + "blogposts/" + id)
                if (!results.ok) throw new Error("got data in return but the ok flag is not true! response: " + results)
                results = await results.json()
            } catch (error) {
                console.error(error)
                return null
            }
            return await results
        },

        getAll: async () => {
            let results
            try {
                results = await fetch(this.state.endpoint + "blogposts/")
                if (!results.ok) throw new Error("got data in return but the ok flag is not true! response: " + results)
                results = await results.json()
            } catch (error) {
                console.error(error)
                return null
            }
            return await results
        },

        post: async data => {
            let results
            try {
                if (typeof data !== "object") throw new Error("data must be an object")
                results = await fetch(this.state.endpoint + "blogposts/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                if (!results.ok) throw new Error("got data in return but the ok flag is not true! response: " + results)
                if (results.status !== 201) return false
                results = await results.json()
            } catch (error) {
                console.error(error)
                return null
            }
            return await results
        },

        put: async (id, data) => {
            let results
            try {
                if (id === "" || id === undefined || id === null) throw new Error("id must be present")
                if (typeof data !== "object") throw new Error("data must be an object")
                results = await fetch(this.state.endpoint + "blogposts/" + id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                if (!results.ok) throw new Error("got data in return but the ok flag is not true! response: " + results)
                results = await results.json()
            } catch (error) {
                console.error(error)
                return null
            }
            return await results
        },

        delete: async id => {
            let results
            try {
                if (id === "" || id === undefined || id === null) throw new Error("id must be present")
                results = await fetch(this.state.endpoint + "blogposts/" + id, {
                    method: "DELETE"
                })
                if (!results.ok) throw new Error("got data in return but the ok flag is not true! response: " + results)
                results = await results.json()
            } catch (error) {
                console.error(error)
                return null
            }
            return await results
        },

        cover: async () => {} // TODO
    }

    toggleSignedIn = () => {
        this.setState({ signedin: !this.state.signedin })
    }

    render() {
        return (
            <Router basename="/">
                <Route render={routeProps => <NavBar {...routeProps} toggle={() => this.toggleSignedIn()} signedin={this.state.signedin} />} />
                <Route render={routeProps => <Home {...routeProps} crud={this.crud_blogposts} />} exact path="/" />
                <Route render={routeProps => <Blog {...routeProps} get={id => this.crud_blogposts.get(id)} />} exact path="/blog/:id" />
                <Route render={routeProps => <NewBlogPost {...routeProps} post={data => this.crud_blogposts.post(data)} />} exact path="/new" />
                <Route render={routeProps => <AuthorSignUp {...routeProps} crud={this.crud_authors} />} exact path="/signup" />
                <Route render={routeProps => <Author {...routeProps} crud={this.crud_authors} />} exact path="/author/:id" />
                <Route render={routeProps => <Footer {...routeProps} />} />
            </Router>
        )
    }
}

export default App
