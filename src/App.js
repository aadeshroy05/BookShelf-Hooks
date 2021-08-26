import React from 'react'
import MyRead from './MyRead'
import Route from './Route'
import Search from './Search'

const App = () => {
    return (
        <div>
            <Route path="/">
                <MyRead />
            </Route>
            <Route path="/search">
                <Search />
            </Route>
        </div>
    )
}

export default App;