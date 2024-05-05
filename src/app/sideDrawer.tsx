import { Show, Ticket, UserInputTickets } from '@/types/types';
import React, { useState } from 'react';
import { getShowList, hostShow } from './api/crowTixContractConnect';


interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (show: Show) => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose, onSave }) => {
    const [showName, setShowName] = useState<string>('');
    const [numberOfRows, setNumberOfRows] = useState<number>(1);
    const [numberOfColumns, setNumberOfColumns] = useState<number>(1);
    const [minimumRevenue, setMinimumRevenue] = useState<number>(0);
    const [showInfo, setShowInfo] = useState<string>('');
    const [seatArrangement, setSeatArrangement] = useState<string>('');

    const handleSave = async () => {
        const tickets:  UserInputTickets[] = [];
        const ticketIds: string[] = [];

        for (let i = 1; i <= numberOfRows; i++) {
            for (let j = 1; j <= numberOfColumns; j++) {
                const ticketId = `${String.fromCharCode(64 + i)}${j}`;
                const ticket: UserInputTickets = {
                    id: ticketId,
                    price: 0
                };
                tickets.push(ticket);
                ticketIds.push(ticketId);
            }
        }
        console.log(tickets)

        console.log(await hostShow(showName,tickets,minimumRevenue,showInfo));
        console.log(await getShowList());
        onClose();
    };

    const sideDrawerStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        padding: '10px',
        left: isOpen ? 0 : '-400px', // Adjust to control side drawer visibility
        width: '350px',
        height: '100%',
        backgroundColor: '#333', // Dark theme background color
        color: '#fff', // Dark theme text color
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        transition: 'left 0.3s ease',
        zIndex: 1000,
    };

    const closeButtonStyle: React.CSSProperties = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
    };

    const inputContainerStyle: React.CSSProperties = {
        padding: '20px',
    };

    const labelStyle: React.CSSProperties = {
        marginBottom: '5px',
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#555', // Dark theme input background color
        color: '#fff', // Dark theme input text color
    };

    const buttonStyle: React.CSSProperties = {
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#fff',
        color: '#333', // Button color for dark theme
        cursor: 'pointer',
    };

    return (
        <div style={sideDrawerStyle}>
            <div style={closeButtonStyle} onClick={onClose}>X</div>
            <div style={inputContainerStyle}>
                <h2>Create New Show</h2>
                <label style={labelStyle} htmlFor="showName">Show Name:</label>
                <input style={inputStyle} type="text" id="showName" value={showName} onChange={(e) => setShowName(e.target.value)} />

                <label style={labelStyle} htmlFor="numberOfRows">Number of Rows:</label>
                <input style={inputStyle} type="number" id="numberOfRows" value={numberOfRows} onChange={(e) => setNumberOfRows(parseInt(e.target.value))} />

                <label style={labelStyle} htmlFor="numberOfColumns">Number of Columns:</label>
                <input style={inputStyle} type="number" id="numberOfColumns" value={numberOfColumns} onChange={(e) => setNumberOfColumns(parseInt(e.target.value))} />

                <label style={labelStyle} htmlFor="minimumRevenue">Minimum Revenue:</label>
                <input style={inputStyle} type="number" id="minimumRevenue" value={minimumRevenue} onChange={(e) => setMinimumRevenue(parseInt(e.target.value))} />

                <label style={labelStyle} htmlFor="showInfo">Show Info:</label>
                <textarea style={inputStyle} id="showInfo" value={showInfo} onChange={(e) => setShowInfo(e.target.value)} />

                <label style={labelStyle} htmlFor="seatArrangement">Seat Arrangement:</label>
                <input style={inputStyle} type="text" id="seatArrangement" value={seatArrangement} onChange={(e) => setSeatArrangement(e.target.value)} />

                <div>
                    <button style={buttonStyle} onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};


export default SideDrawer;
