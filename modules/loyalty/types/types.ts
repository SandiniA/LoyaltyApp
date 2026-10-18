export enum Tier {
    Bronze = 'Bronze',
    Silver = 'Silver',
    Gold = 'Gold',
    Platinum = 'Platinum'
};

export enum OfferStatus {
    Available = 'Available now',
    Expired = 'Expired'
};

export type Member = {
    id: string;
    name: string;
    points: number;
    tier: Tier;
};

export type Offer = {
    id: string;
    title: string;
    description: string;
    pointsRequired: number;
    terms: string;
    expiresAt: string;
};

export type Redemption = {
  offerId: string;
  code: string;
  redeemedAt: string;
};