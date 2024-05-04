'use client'
import AppHeader from '@/app/appHeader';
import { useRouter } from 'next/navigation';
import React from 'react';

interface BookingResultPageProps {
    status: string;
}

const BookingResultPage= ({ params } : {params: BookingResultPageProps}) => {
    const status = params.status;
    const router = useRouter();
    let message: string;
    let backgroundColor: string;

    if (status === 'success') {
        message = 'Booking Successful!';
        backgroundColor = '#5cb85c'; // Success color
    } else if (status === 'failure') {
        message = 'Booking Failed!';
        backgroundColor = '#d9534f'; // Failure color
    } else {
        return null; // Return null if status is neither success nor failure
    }

    const landingPageStyle: React.CSSProperties = {
        textAlign: 'center',
        padding: '50px 20px',
        backgroundColor: backgroundColor,
        color: '#fff',
    };

    const buttonStyle: React.CSSProperties = {
        display: 'inline-block',
        margin: '10px',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        background: '#fff',
        color: backgroundColor === '#5cb85c' ? '#5cb85c' : '#d9534f', // Button color matches background color
        textDecoration: 'none',
    };

    const goBack = () => {
        router.back();
    };

    const goToHome = () => {
        router.push('/');
    };

    return (
        <>
        <AppHeader/>
        <div style={landingPageStyle}>
            <h1>{message}</h1>
            <div>
                <button style={buttonStyle} onClick={goBack}>Go Back</button>
                <button style={buttonStyle} onClick={goToHome}>Go to Home</button>
            </div>
        </div>
        </>
    );
};

export default BookingResultPage;

