'use client'
import { Show } from '@/types/types';
import { list } from 'postcss';
import React, { useEffect, useState } from 'react';
import { showData } from '../../public/static-data';
import { getShowInfo, getShowList } from './api/crowTixContractConnect';
import getEthereumAccount from './api/wallet-connect';
import AppHeader from './appHeader';
import ShowCard from './card';
import './globals.css';
import SideDrawer from './sideDrawer';


const HomePage: React.FC = () => {
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
    const [showData, setShowData] = useState<any[]>([]);
    const cardContainer: React.CSSProperties = {
        display: 'inline-flex',
        transition: 'box-shadow 0.3s ease',
    };
    const homeStyle: React.CSSProperties = {
        backgroundColor: 'black'
    };

    
    const onSideDrawerClose = () => {
        setSideDrawerOpen(false);

    }

    const onSideDrawerSave = () => {
        setSideDrawerOpen(false);
    }
    const onHostButtonClick = async () => {
        console.log(await getShowList());
        setSideDrawerOpen(true);
        getEthereumAccount();
    }

    useEffect(() => {
        async function init() {
            const listOfShows = await getShowList();
            const currShowData = await  Promise.all(listOfShows.map(async (x: string) => 
                getShowInfo(x)
            ))
            setShowData(currShowData);
        }
        init();
    },[])
    
    
    
    return (
        <>
        <AppHeader onHostButtonClick={onHostButtonClick}/>            
        <h1>Show List</h1>
            <div className="show-cards" style={cardContainer}>
                {showData.map((show: Show) => (
                    <ShowCard key={show.showName} show={show} />
                ))}
            </div>
        <SideDrawer isOpen={sideDrawerOpen} onClose={onSideDrawerClose} onSave={onSideDrawerSave}/>
        </>
        
    );
};

export default HomePage;
