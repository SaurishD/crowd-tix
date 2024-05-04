'use client'
import { Show } from "@/types/types";
import React from "react";
import { useRouter } from "../../node_modules/next/navigation";


const useStyles = (isHovered: boolean) => ({
    showCard: {
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
        boxShadow: isHovered ? '0px 0px 20px rgba(0, 0, 0, 0.2)' : '0px 0px 10px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease',
    },
    title: {
        marginTop: 0,
        marginBottom: 10,
    },
    paragraph: {
        margin: 0,
        marginBottom: 5,
    },
});


interface ShowCardProps {
    show: Show;
}
const ShowCard:React.FC<ShowCardProps> = (props) => {
    const {show} = props;
    const [isHovered, setIsHovered] = React.useState(false);

    const router = useRouter();

    const handleClick = () => {
        router.push(`ShowDetails/${show.showName}`); // Navigate to the show details page with the show ID in the URL
    };

    // Define inline styles
    const cardStyle: React.CSSProperties = {
        width: '400px', // Adjust the max width as needed
        margin: '25px', // Center the card horizontally
        
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        cursor: 'pointer',
        backgroundColor: '#333', // Dark background color
        color: '#fff', // Light text color
        boxShadow: isHovered ? '0px 0px 20px rgba(255, 255, 255, 0.2)' : '0px 0px 10px rgba(255, 255, 255, 0.1)',
        transition: 'box-shadow 0.3s ease',
    };


    return (
        <div
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <h2>{show.showName}</h2>
            <p>{show.showInfo}</p>
            <p>Tickets Available: {show.ticketIds.length}</p>
            <p>Minimum Revenue: ${show.minimumRevenue}</p>
            {/* Add more details as needed */}
        </div>
    );
}

export default ShowCard;