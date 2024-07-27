import React, { useEffect, useState } from 'react';
import './Seat.css';
import Image1 from "./padamBooking.png";
import { useLocation } from 'react-router-dom';
import Image2 from './Ticket.png';
import axios from 'axios';

function Seat() {
    const loc = useLocation();
    const { movieName, theaterName, screenName, location, startTime, imageURL, seats } = loc.state || {};
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [email, setEmail] = useState('');

    const TICKET_PRICE = 160;
    const BASE_AMOUNT = 25;
    const GST_RATE = 0.03;

    const sortedSeats = seats.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

    const myClick = (seat) => {
        const index = selectedSeat.indexOf(seat);
        const seatElement = document.querySelector(`.${seat}`);
        seatElement.classList.toggle("seat-selected");

        if (index > -1) {
            const seatArr = selectedSeat.filter((_, i) => i !== index);
            setSelectedSeat(seatArr);
            return;
        }

        setSelectedSeat(prevSelectedSeat => [...prevSelectedSeat, seat]);
    };

    const Exit = () => {
        window.history.back();
    };


    const bookTicket = () => {
        alert(`The ticket will be sent to your email
    Enjoy the show and visit again.
    Thank you!`);

        document.querySelector('#cinema-hall-total').style.display = 'none';
        document.querySelector('#ticket-information').style.display = 'block';

        // Send email with ticket details
        axios.post('http://localhost:8080/api/send-email', {
            email: email,
            ticketDetails: {
                movieName,
                theaterName,
                location,
                screenName,
                selectedSeats: selectedSeat.join(', '),
                startTime,
                totalPrice: totalPrice.toFixed(2)
            }
        })
            .then(response => {
                console.log('Email sent successfully:', response);
            })
            .catch(error => {
                console.error('Error sending email:', error);
            });

       
        startCountdown();
    };

    const downloadTicketInformation = () => {
        const ticketInfo = document.getElementById('ticket-information').innerHTML;
        const blob = new Blob([ticketInfo], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'ticket_information.html';
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const totalSeats = selectedSeat.length;
    const ticketPriceTotal = totalSeats * TICKET_PRICE;
    const baseAmountTotal = totalSeats * BASE_AMOUNT;
    const gstAmount = (ticketPriceTotal + baseAmountTotal) * GST_RATE;
    const totalPrice = ticketPriceTotal + baseAmountTotal + gstAmount;

    const [a, setA] = useState(1);
    const b = 60;
    const [c, setC] = useState(b - a);

    useEffect(() => {
        let interval;
        if (a <= b) {
            interval = setInterval(() => {
                setA(prevA => prevA + 1);
                setC(b - (a + 1));
            }, 1000);
        }

        if (c <= 10) {
            const timeoffElement = document.querySelector('.timeoff');
            if (timeoffElement) {
                timeoffElement.style.color = 'red';
                timeoffElement.classList.toggle("timeoff2");
            }
        } else if(c <= 30){
            const timeoffElement = document.querySelector('.timeoff');
            if (timeoffElement) {
                timeoffElement.style.color = 'yellow';
            }
        } else if(c <= 60){
            const timeoffElement = document.querySelector('.timeoff');
            if (timeoffElement) {
                timeoffElement.style.color = 'green';
            }
        }

        return () => clearInterval(interval);
    }, [a,c]);

    const startCountdown = () => {
        setA(1);
        setC(b - 1);
        
        const myTime = () => {
            window.location.href = '/ ';
        };
    
        setInterval(myTime, 60000);
    
    };

    return (
        <>
            <div id='cinema-hall-total'>
                <div id='cinema-hall'>
                    <button onClick={Exit} id='exit-btn'>EXIT</button>
                </div>
                <div id='seat-container'>
                    {sortedSeats.map(seat => (
                        <button key={seat.id} onClick={() => myClick(seat.name)} className={`seat ${seat.name}`}>
                            {seat.name}<div className='seat-inside'></div>
                        </button>
                    ))}
                </div>
                <div id='payment-details'>
                    <img id='payment-logo' src={Image1} alt="Payment Logo"></img>
                    <form id='payment-form'>
                        <hr></hr>
                        <label>Enter Your E-mail ID</label>
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required></input><br></br>
                        <span>Movie: </span>{movieName}<br></br>
                        <span>Theater: </span>{theaterName}<br></br>
                        <span>Location: </span>{location}<br></br>
                        <span>Audi: </span>{screenName}<br></br>
                        <span>Show Time: </span>{startTime}<br></br>
                        <span>Seats: </span>{selectedSeat.join(', ')}<br></br>
                        <hr></hr>
                        <span>Ticket(s) price: </span>&#8377;{ticketPriceTotal}<br></br>
                        <span>Base Amount: </span>&#8377;{baseAmountTotal}<br></br>
                        <span>Integrated GST (IGST)@ 18%: </span>&#8377;{gstAmount.toFixed(2)}<br></br>
                        <span>Total Price: </span>&#8377;{totalPrice.toFixed(2)}<br></br>
                    </form>
                    <button onClick={bookTicket} type='submit' id='bookticket-btn'>Book Ticket</button>
                </div>
            </div>

            <div id='ticket-information'>
                <h2>Download the ticket within one minute, after which it will expire <h2 style={{display:'inline-block',color:'green'}}  className='timeoff'> {c}</h2></h2>
                <img id='icon' src={Image2} alt="Icon" />
                <img id='app-icon' src={Image1} alt="App Icon" />
                <img id='movie-icon' src={imageURL} alt="Movie Icon" />
                <div id='ticket-logo'>
                    {movieName}<br />
                    {theaterName}<br />
                    {location}<br />
                    {screenName}<br />
                    {selectedSeat.join(', ')}<br />
                    {startTime}<br />
                    <span>Total Price: </span>&#8377;{totalPrice.toFixed(2)}<br />
                    <button id='download-btn' onClick={downloadTicketInformation}>Download &#11015;</button>
                </div>
            </div>
        </>
    );
}

export default Seat;