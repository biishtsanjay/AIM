import React from 'react'
import "../App.css"
const Home = ({setLoginUser}) => {
  return (
    <div>
      <h1 className="homepage">
        Welcome to Home Page
      </h1>
      <br></br>
      <div className="button" onClick={()=>setLoginUser({})}>Logout</div>
    </div>
      )
}

export default Home
