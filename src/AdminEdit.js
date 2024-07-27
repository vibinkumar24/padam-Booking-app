import React from 'react'
import Image1 from "./padamBooking.png";
import './AdminEdit.css';

function AdminEdit() {
    function myClick1() {
        document.getElementById("update-show").style.display = "none"
        document.getElementById("delete-show").style.display = "none";
        document.getElementById("create-show").style.display = "block";
    }
    function myClick2() {
        document.getElementById("update-show").style.display = "block"
        document.getElementById("delete-show").style.display = "none";
        document.getElementById("create-show").style.display = "none";
    }
    function myClick3() {
        document.getElementById("update-show").style.display = "none"
        document.getElementById("delete-show").style.display = "block";
        document.getElementById("create-show").style.display = "none";
    }
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <div><h1>Welcome To </h1></div>
                <div><img src={Image1}></img></div>
                <div>
                    <button onClick={myClick1}>Create Show</button>
                    <button onClick={myClick2}>Update Show</button>
                    <button onClick={myClick3}>Delete Show</button>
                </div>
            </div>
            <div>
                <form id='create-show'>
                    <label for="cars">Movie ID:</label>
                    <select >
                        <option value="volvo">1</option>
                    </select><br></br>
                    <label>Movie Title</label>
                    <input type='text'></input><br></br>
                    <label>Rating</label>
                    <input type='number'></input><br></br>
                    <label>Image URL</label>
                    <input type='url'></input>
                </form>
                <form id='update-show'>
                    <label for="cars">Movie ID:</label>
                    <select >
                        <option value="volvo">1</option>
                        <option value="volvo">2</option>
                        <option value="volvo">3</option>
                        <option value="volvo">4</option>
                        <option value="volvo">5</option>
                    </select><br></br>
                    <label>Movie Title</label>
                    <input type='text'></input><br></br>
                    <label>weugyc</label>
                    <input type='text'></input>
                </form>
                <form id='delete-show'>
                    <label for="cars">Movie ID:</label>
                    <select >
                        <option value="volvo">1</option>
                        <option value="volvo">2</option>
                        <option value="volvo">3</option>
                        <option value="volvo">4</option>
                        <option value="volvo">5</option>
                    </select><br></br>
                    <label>Movie Title</label>
                    <input type='text'></input>
                </form>
            </div>
        </>
    )
}

export default AdminEdit