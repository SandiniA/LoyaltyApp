import { Member, Offer } from "../types/types";
import { mockMember, mockOffers } from "./mockData";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const simulateApiCall = async <T>(data: T): Promise<T> => {
    await delay(500 + Math.random() * 700); // Simulate API delay

    if (Math.random() < 0.1) { // Simulate a 10% chance of API failure
        throw new Error("Something went wrong. Please try again.");
    }

    return data;
};

export const getMemberData = async () => {
    return await simulateApiCall<Member>(mockMember);
};

export const getOffersData = async () => {
    return await simulateApiCall<Offer[]>(mockOffers);
};

export const getOfferDetails = async (offerId: string) => {
    const offer = mockOffers.find(o => o.id === offerId);

    if (!offer) {
        throw new Error("Offer not found");
    }
    
    return await simulateApiCall<Offer>(offer);
};