// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//TODO: add banner in the show info.
//TODO: make the owner secret.
//TODO: Encorporate Date component into the contract.

contract CrowdTix {
    //Data

    struct UserInputTicket {
        string id;
        uint price;
    }

    struct Ticket {
        string id;
        uint price;
        address owner;
        bool isReserved;
    }

    struct Show {
        string showName;
        mapping(string => Ticket) tickets;
        string[] ticketIds;
        uint16 minimumRevenue;
        address payable owner;
        string showInfo;
        string seatArrangement;
        //Add deadline event.
    }

    struct ShowDetails {
        string showName;
        Ticket[] tickets;
        string[] ticketIds;
        uint16 minimumRevenue;
        address payable owner;
        string showInfo;
        string seatArrangement;
    }

    address payable contractOwner;
    mapping(string => Show) showMapping;
    string[] listOfShows;

    // uint dataCount = 0;
    // string latestShow;

    //Functions
    constructor() {
        contractOwner = payable(msg.sender);
    }

    //Get shows
    function getShowList() public view returns (string[] memory) {
        return listOfShows;
    }

    // function getLatestShow() public view returns (string memory) {
    //     return latestShow;
    // }

    // function getCount() public view returns (uint) {
    //     return dataCount;
    // }

    //Get show availability
    function getShowAvailability(
        string memory showName
    ) public view returns (string[] memory) {
        Show storage show = showMapping[showName];
        uint availableCount = 0;
        for (uint i = 0; i < show.ticketIds.length; i++) {
            if (!show.tickets[show.ticketIds[i]].isReserved) {
                availableCount++;
            }
        }
        string[] memory availabeSeats = new string[](availableCount);
        for (uint i = 0; i < show.ticketIds.length; i++) {
            if (!show.tickets[show.ticketIds[i]].isReserved) {
                availabeSeats[availabeSeats.length - availableCount] = show
                    .ticketIds[i];
                availableCount--;
            }
        }
        return availabeSeats;
    }

    function getShowInfo(
        string memory showName
    ) public view returns (ShowDetails memory) {
        Show storage _show = showMapping[showName];
        ShowDetails memory showDetails;

        showDetails.showName = _show.showName;
        showDetails.minimumRevenue = _show.minimumRevenue;
        showDetails.owner = _show.owner;
        showDetails.showInfo = _show.showInfo;
        showDetails.seatArrangement = _show.seatArrangement;
        showDetails.ticketIds = _show.ticketIds;
        showDetails.tickets = new Ticket[](_show.ticketIds.length);

        // Convert ticketIds to tickets
        for (uint256 i = 0; i < _show.ticketIds.length; i++) {
            showDetails.tickets[i] = _show.tickets[_show.ticketIds[i]];
        }

        return showDetails;
    }

    //Host show.
    function hostShow(
        string memory id,
        UserInputTicket[] memory tickets,
        uint16 minimumRevenue,
        string memory showInfo,
        string memory seatArrangement
    ) public {
        Show storage newShow = showMapping[id];
        mapping(string => Ticket) storage ticketMappings = newShow.tickets;
        for (uint i = 0; i < tickets.length; i++) {
            require(bytes(tickets[i].id).length != 0);
            ticketMappings[tickets[i].id].id = tickets[i].id;
            ticketMappings[tickets[i].id].price = tickets[i].price;
            ticketMappings[tickets[i].id].isReserved = false;
            newShow.ticketIds.push(tickets[i].id);
        }
        newShow.owner = payable(msg.sender);
        newShow.showName = id;
        // // newShow.tickets = tickets;  check this out. Test this.
        listOfShows.push(id);
        newShow.minimumRevenue = minimumRevenue;
        newShow.showInfo = showInfo;
        newShow.seatArrangement = seatArrangement;
        // dataCount++;
    }

    //Book ticket.
    function bookShow(
        string memory showId,
        string memory seatId
    ) public payable {
        require(msg.value == showMapping[showId].tickets[seatId].price);
        bool isReserved = showMapping[showId].tickets[seatId].isReserved;
        require(!isReserved);
        showMapping[showId].tickets[seatId].isReserved = true;
        showMapping[showId].tickets[seatId].owner = msg.sender;
    }

    function verify(
        string memory showId,
        string memory seatId
    ) public view returns (bool) {
        return showMapping[showId].tickets[seatId].owner == msg.sender;
    }
}
