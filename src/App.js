import React from "react"
import NavBar from "./components/navbar"
import Footer from "./components/footer"
import Home from "./views/home"
import Blog from "./views/blog"
import NewBlogPost from "./views/new"
import { BrowserRouter, HashRouter, Route } from "react-router-dom"

const Router = process.env.NODE_ENV === "production" ? HashRouter : BrowserRouter

class App extends React.Component {
    state = {
        endpoint: "http://localhost:8888/blogposts/",
        blogPosts: null
    }

    componentDidMount = async () => {
        this.setState({ blogPosts: await this.crud.getAll() })
    }

    crud = {
        get: async id => {
            let results
            try {
                if (id === "" || id === undefined || id === null) throw new Error("id must be present")
                results = await fetch(this.state.endpoint + id)
                if (!results.ok) throw new Error("got data in return but the ok flag is not true! response: " + results)
                results = await results.json()
            } catch (error) {
                console.error(error)
                return null
            }
            console.log(results)
            return await results
        },
        getAll: async () => {
            let results
            try {
                results = await fetch(this.state.endpoint)
                if (!results.ok) throw new Error("got data in return but the ok flag is not true! response: " + results)
                results = await results.json()
            } catch (error) {
                console.error(error)
                return null
            }
            console.log(results)
            return await results
        },

        post: async data => {
            let results
            try {
                if (typeof data !== "object") throw new Error("data must be an object")
                results = await fetch(this.state.endpoint, {
                    method: "POST",
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

        put: async (id, data) => {
            let results
            try {
                if (id === "" || id === undefined || id === null) throw new Error("id must be present")
                if (typeof data !== "object") throw new Error("data must be an object")
                results = await fetch(this.state.endpoint + id, {
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
                results = await fetch(this.state.endpoint + id, {
                    method: "DELETE"
                })
                if (!results.ok) throw new Error("got data in return but the ok flag is not true! response: " + results)
                results = await results.json()
            } catch (error) {
                console.error(error)
                return null
            }
            return await results
        }
    }

    render() {
        return (
            <Router basename="/">
                <NavBar />
                <Route render={routeProps => <Home {...routeProps} blogPosts={this.state.blogPosts} />} exact path="/" />
                <Route render={routeProps => <Blog {...routeProps} get={id => this.crud.get(id)} />} exact path="/blog/:id" />
                <Route render={routeProps => <NewBlogPost {...routeProps} post={data => this.crud.post(data)} />} exact path="/new" />
                <Footer />
            </Router>
        )
    }
}

export default App
