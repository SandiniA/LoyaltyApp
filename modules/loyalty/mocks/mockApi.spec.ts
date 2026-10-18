import { getMemberData, getOfferDetails, getOffersData, simulateApiCall } from './mockApi';
import { mockMember, mockOffers } from './mockData';

const MAX_DELAY_MS = 1200;
const SUCCESS_RANDOM = 0.5;
const FAILURE_RANDOM = 0.05;

describe('mockApi', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    describe('simulateApiCall', () => {
        it('should resolve with the given data', async () => {
            jest.spyOn(Math, 'random').mockReturnValue(SUCCESS_RANDOM);
            const data = { foo: 'bar' };

            const promise = simulateApiCall(data);
            await jest.advanceTimersByTimeAsync(MAX_DELAY_MS);

            await expect(promise).resolves.toBe(data);
        });

        it('should wait for the simulated delay before resolving', async () => {
            jest.spyOn(Math, 'random').mockReturnValue(SUCCESS_RANDOM); // delay = 500 + 0.5 * 700 = 850ms
            const onResolve = jest.fn();

            simulateApiCall('data').then(onResolve);

            await jest.advanceTimersByTimeAsync(849);
            expect(onResolve).not.toHaveBeenCalled();

            await jest.advanceTimersByTimeAsync(1);
            expect(onResolve).toHaveBeenCalledWith('data');
        });

        it('should reject when the simulated failure is triggered', async () => {
            jest.spyOn(Math, 'random').mockReturnValue(FAILURE_RANDOM);

            const assertion = expect(simulateApiCall('data')).rejects.toThrow(
                'Something went wrong. Please try again.',
            );
            await jest.advanceTimersByTimeAsync(MAX_DELAY_MS);

            await assertion;
        });

        it('should resolve when the random value is exactly at the failure threshold', async () => {
            jest.spyOn(Math, 'random')
                .mockReturnValueOnce(0) // delay
                .mockReturnValueOnce(0.1); // failure check

            const promise = simulateApiCall('data');
            await jest.advanceTimersByTimeAsync(MAX_DELAY_MS);

            await expect(promise).resolves.toBe('data');
        });
    });

    describe('getMemberData', () => {
        it('should resolve with the mock member', async () => {
            jest.spyOn(Math, 'random').mockReturnValue(SUCCESS_RANDOM);

            const promise = getMemberData();
            await jest.advanceTimersByTimeAsync(MAX_DELAY_MS);

            await expect(promise).resolves.toEqual(mockMember);
        });

        it('should reject when the API call fails', async () => {
            jest.spyOn(Math, 'random').mockReturnValue(FAILURE_RANDOM);

            const assertion = expect(getMemberData()).rejects.toThrow(
                'Something went wrong. Please try again.',
            );
            await jest.advanceTimersByTimeAsync(MAX_DELAY_MS);

            await assertion;
        });
    });

    describe('getOffersData', () => {
        it('should resolve with the mock offers', async () => {
            jest.spyOn(Math, 'random').mockReturnValue(SUCCESS_RANDOM);

            const promise = getOffersData();
            await jest.advanceTimersByTimeAsync(MAX_DELAY_MS);

            await expect(promise).resolves.toEqual(mockOffers);
        });

        it('should reject when the API call fails', async () => {
            jest.spyOn(Math, 'random').mockReturnValue(FAILURE_RANDOM);

            const assertion = expect(getOffersData()).rejects.toThrow(
                'Something went wrong. Please try again.',
            );
            await jest.advanceTimersByTimeAsync(MAX_DELAY_MS);

            await assertion;
        });
    });

    describe('getOfferDetails', () => {
        it('should resolve with the offer matching the given id', async () => {
            jest.spyOn(Math, 'random').mockReturnValue(SUCCESS_RANDOM);
            const offer = mockOffers[1];

            const promise = getOfferDetails(offer.id);
            await jest.advanceTimersByTimeAsync(MAX_DELAY_MS);

            await expect(promise).resolves.toEqual(offer);
        });

        it('should reject immediately when the offer does not exist', async () => {
            await expect(getOfferDetails('unknown-id')).rejects.toThrow('Offer not found');
        });

        it('should reject when the API call fails', async () => {
            jest.spyOn(Math, 'random').mockReturnValue(FAILURE_RANDOM);

            const assertion = expect(getOfferDetails(mockOffers[0].id)).rejects.toThrow(
                'Something went wrong. Please try again.',
            );
            await jest.advanceTimersByTimeAsync(MAX_DELAY_MS);

            await assertion;
        });
    });
});
