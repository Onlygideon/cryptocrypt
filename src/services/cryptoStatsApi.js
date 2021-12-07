import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiStatsHeader = {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_STATS_API_KEY,
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createUrlRequest = (url) => ({ url, headers: cryptoApiStatsHeader });

export const cryptoStatsApi = createApi({
    reducerPath: 'cryptoStatsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoStats: builder.query({
            query: (count) => createUrlRequest(`/coins?limit=${count}`)
        }), 
        getExchanges: builder.query({
            query: ({count}) => createUrlRequest(`/exchanges?limit=${count}`)
        }), 
        getCryptoDetails: builder.query({
            query: (coinId) => createUrlRequest(`/coin/${coinId}`)
        })  
    })
});

export const {
    useGetCryptoStatsQuery,
    useGetCryptoDetailsQuery,
    useGetExchangesQuery
} = cryptoStatsApi;