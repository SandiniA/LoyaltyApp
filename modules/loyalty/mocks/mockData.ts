import { Member, Tier } from "../types/types";

export const mockMember: Member = {
    id: "1",
    name: "Sandini Anuradha",
    points: 1000,
    tier: Tier.Silver
};

export const mockOffers = [
    {
        id: "1",
        title: "10% Off on Electronics",
        description: "Get 10% off on all electronics items.",
        pointsRequired: 500,
        terms: "Valid for one-time use only.",
        expiresAt: "2026-12-31T23:59:59Z"
    },
    {
        id: "2",
        title: "Free Coffee",
        description: "Enjoy a free coffee at participating cafes.",
        pointsRequired: 200,
        terms: "Valid for one-time use only.",
        expiresAt: "2026-11-30T23:59:59Z"
    },
    {
        id: "3",
        title: "20% Off on Apparel",
        description: "Get 20% off on all apparel items.",
        pointsRequired: 800,
        terms: "Valid for one-time use only.",
        expiresAt: "2024-10-31T23:59:59Z"
    }
];