import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const api_key=import.meta.env.VITE_RAPID_API_KEY; 

export const articlesApi = createApi({
    reducerPath: 'articlesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
    prepareHeaders: (headers) => {
        headers.set('X-RapidAPI-Key', api_key);
        headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');
        return headers;
    },
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=5`
        })
    })
});

export const {useLazyGetSummaryQuery} = articlesApi;