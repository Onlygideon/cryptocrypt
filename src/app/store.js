import { configureStore } from "@reduxjs/toolkit";

import { cryptoStatsApi } from "../services/cryptoStatsApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";

export default configureStore({
    reducer:{
        [cryptoStatsApi.reducerPath]: cryptoStatsApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
})