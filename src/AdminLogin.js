import React, { useState } from 'react';
import axios from 'axios';
import Image1 from "./padamBooking.png";
import Image2 from "./face.jpg";
import Image3 from "./twi.jpg";
import Image4 from "./insta.jpg";
import './AdminLogin.css';
import { Link } from 'react-router-dom';
import AdminEdit  from './AdminEdit';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [failMessage, setFailMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password
            });
            setMessage(response.data.message);
            if (response.data.message === 'Login successful') {
                setMessage(`Login successful`);
                window.location.href = '/admin-edit';
            }else {
                setFailMessage('Invalid Username or Password')
            }
        
    };

    return (
        <div>
            <header id='admin-header'>
                <h1>Welcome Admin</h1>
                
            </header>
            <Link to="/" id='admin-to-home'>&#8606; HOME</Link>
            <div id='admin-login'>
                <div id='admin-content'>
                    <form onSubmit={handleSubmit}>
                    <img id='admin-logo' src={Image1} alt="Title" /><hr></hr>
                        <div><br></br>
                            <label class='admin-label'>Username</label>
                            <input  class="mainLoginInput"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div><br></br><br></br>
                            <label class='admin-label'>Password</label>
                            <input  class="mainLoginInput"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                             {message && <p style={{ color: 'green',boxShadow : '0px 0px 0px 0px', marginLeft: '100px' }}>{message}</p>}
                             {failMessage && <p style={{ color: 'red',boxShadow : '0px 0px 0px 0px', marginLeft: '100px' }}>{failMessage}</p>}
                        </div><br></br>
                        <button class="search-btn" type="submit">Login</button>
                       
                    </form>
                </div>
            </div>
            <footer id='admin-footer'>
                <p class='copy-rights'>Copyright 2024 &#169; PadamBooking All Rights Reserved.</p>
                <div id="social-div">
                    <a href={"https://www.facebook.com/"}><img class='social-media' src={Image2}></img></a>
                    <a href={"https://x.com/?lang=en"}><img class='social-media' src={Image3}></img></a>
                    <a href={"https://www.instagram.com/"}><img class='social-media' src={Image4}></img></a>
                </div>
            </footer>
        </div>
    );
}

export default AdminLogin;