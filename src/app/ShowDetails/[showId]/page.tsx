'use client'
import { Show } from '@/types/types';
import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


import { showData } from '../../../../public/static-data';
import SideDrawer from '@/app/sideDrawer';
import AppHeader from '@/app/appHeader';

const ShowDetailsPage = ({params}: {params : {showId: string}}) => {
   const router = useRouter();
   
    const id = params.showId; 
    const show: Show | undefined = showData.find(show => show.showName === id);

    // Return null if the show is not found
    const handleTicketClick = () => {
        const isConfirmed = confirm('Are you sure you want to book this ticket?');
        
        if (isConfirmed) {
            const isSuccess = Math.random() < 0.5; // Randomly determine success or failure
            
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
                {show.ticketIds.map(ticketId => (
                    <div 
                        key={ticketId} 
                        style={show.tickets[ticketId].isReserved ? reservedTicketStyle : ticketStyle} 
                        onClick={() => handleTicketClick()} // Call handleTicketClick function on click
                    >
                        <p>Ticket ID: {ticketId}</p>
                        <p>Price: ${show.tickets[ticketId].price}</p>
                        <p>Owner: {show.tickets[ticketId].owner}</p>
                    </div>
                ))}
            </div>
        </div>
        
        </>
    );
};

export default ShowDetailsPage;
