import React, { Component } from "react";
import { useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import { Privates } from "../enums/private.enum";
import CrowdTixCompiled from "../../../build/contracts/CrowdTix.json";
import { InteractionHelper } from "./interaction.helper";
import { UserInputTickets } from "@/types/types";

// const CONTRACT_ADDRESS = Privates.InfuraApiUrl; // Your contract address

export const getShowList = async () => {
  const contractReader = await InteractionHelper.getContractReader();
  console.log(await contractReader.getShowList());
  return contractReader.getShowList();
};

export const getShowInfo = async (showId: string) => {
  const contractReader = await InteractionHelper.getContractReader();
  console.log(await contractReader.getShowInfo(showId));
  return contractReader.getShowInfo(showId);
};

export const hostShow = async (
  id: string,
  tickets: UserInputTickets[],
  minimumRevenue: number,
  showInfo: string
) => {
  const contractWriter = await InteractionHelper.getContractWriter();
  return contractWriter?.hostShow(id, tickets, minimumRevenue, showInfo, "");
};

export const bookShow = async (
  showId: string,
  ticketId: string,
  ticketPriceInEth: number
): Promise<boolean> => {
  try {
    const contractWriter = await InteractionHelper.getContractWriter();
    await contractWriter?.bookShow(showId, ticketId, {
      value: ethers.utils.parseEther(ticketPriceInEth.toString()),
    });
    return true;
  } catch {
    return false;
  }
};

export const verify = async (
  showId: string,
  ticketId: string
): Promise<boolean> => {
  const contractReader = await InteractionHelper.getContractWriter();
  return contractReader?.verify(showId, ticketId);
};

// export const getTestDataCount = async () => {
//   const contractReader = await InteractionHelper.getContractReader();
//   console.log(await contractReader.getLatestShow());
//   return contractReader.getCount();
// };
