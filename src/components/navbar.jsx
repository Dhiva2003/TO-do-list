import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

function Navbar() {
  return (
    <>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#282c34', color: 'white' }}>
             <h1>To Do List App 📝</h1> 
            <nav style={{ marginLeft:"auto",marginTop:"20px"}}>
              <button ><Link to={"/login"} style={{textDecoration:'none'}}>Login</Link></button>
             <button><Link to={"/signup"} style={{textDecoration:'none'}}>Signup</Link></button> 
            </nav>
        </div>
         
    </>
  )
}

export default Navbar