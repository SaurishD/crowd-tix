'use client'
import { Show, ShowDetails } from '@/types/types';
import React, { useEffect, useState } from 'react';
import {  useRouter } from 'next/navigation';
import AppHeader from '@/app/appHeader';
import { bookShow, getShowInfo } from '@/app/api/crowTixContractConnect';

const ShowDetailsPage = ({params}: {params : {showId: string}}) => {
   const router = useRouter();
   const [show, setShow] = useState<ShowDetails | undefined>(undefined);
   
    const id = params.showId; 
    useEffect(() => {
        const init = async () => {
            const dataArray = await getShowInfo(params.showId);
            const ticketArray = dataArray[1].map((x: any) => ({
                id: x[0],
                price: x[1],
                owner: x[2],
                isReserved: x[3]
            }))
            const showDetails = {
                showName: dataArray[0],
                tickets: ticketArray,
                ticketIds: dataArray[2],
                minimumRevenue: dataArray[3],
                owner: dataArray[4],
                showInfo: dataArray[5],
                seatArrangement: dataArray[6]
            };
            setShow(showDetails);
            console.log(showDetails);
        };
        init();
    }, [])

    // Return null if the show is not found
    const handleTicketClick = async (showId: string, ticketId: string, price: number) => {
        const isConfirmed = confirm('Are you sure you want to book this ticket?');
        
        if (isConfirmed) {
            const isSuccess = await bookShow(showId, ticketId, price); // Randomly determine success or failure
            
            // Redirect to the booking result page with the ticket ID and result
            router.push(`/booking-results/${isSuccess ? 'success' : 'failure'}`);
        }
    };

    if (!show) {
        return (
            <div className="not-found">
                <h1>Show Not Found</h1>
                <p>We couldn't find the show you're looking for.</p>
            </div>
        );
    }

    const ticketGridStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gridGap: '20px',
    };

    const ticketStyle: React.CSSProperties = {
        border: '1px solid #ccc',
        padding: '10px',
        cursor: 'pointer', // Add cursor pointer to indicate clickable
    };

    const reservedTicketStyle: React.CSSProperties = {
        ...ticketStyle,
        opacity: 0.5,
        pointerEvents: 'none',
    };

    

    return (
        <>
        <AppHeader/>
        <div className="show-details">
            <h1>{show.showName}</h1>
            <p>{show.showInfo}</p>
            <h2>Tickets:</h2>
            <div style={ticketGridStyle} className="ticket-grid">
                {show.tickets.map(ticket => (
                    <div 
                        key={ticket.id} 
                        style={ticket.isReserved ? reservedTicketStyle : ticketStyle} 
                        onClick={() => handleTicketClick(params.showId, ticket.id, ticket.price)} // Call handleTicketClick function on click
                    >
                        <p>Ticket ID: {ticket.id}</p>
                        <p>Price: ETH{ticket.price.toString()}</p>
                        <p>Owner: {ticket.owner.toString().substring(0,12)}</p>
                    </div>
                ))}
            </div>
        </div>
        
        </>
    );
};

export default ShowDetailsPage;
