'use client'
import Link from 'next/link';
import React, { useState } from 'react';

interface AppHeaderProps  {
    onHostButtonClick?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = (props) => {
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const {onHostButtonClick} = props;

    const headerStyle: React.CSSProperties = {
        backgroundColor: 'rgba(0,0,0,0.2);',
        color: '#fff',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const iconStyle: React.CSSProperties = {
        color: 'white',
    };

    
    const buttonStyle: React.CSSProperties = {
        backgroundColor: '#ffcc00',
        color: '#333',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        ...(isButtonHovered && { backgroundColor: '#ffd633' }),
    };

    return (
        <>
        <div style={headerStyle}>
            <Link href="/" style={iconStyle}><h1>CTX</h1></Link>
            <>
            {onHostButtonClick ? (<button 
                style={buttonStyle} 
                onMouseEnter={() => setIsButtonHovered(true)} 
                onMouseLeave={() => setIsButtonHovered(false)}
                onClick={onHostButtonClick}
            >
                Host Show
            </button>) : <></>}
            
            </>
        </div>
        </>
    );
};

export default AppHeader;
