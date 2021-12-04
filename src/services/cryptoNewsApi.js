import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const cryptoNewsApiHeader = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '4bff17b9efmsh680e4224d6d29a0p1afeaajsn59c1e8de40ce'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createUrlRequest = (url) => ({ url, headers: cryptoNewsApiHeader });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createUrlRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })      
    })
});

export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;