import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from './api';
import { normalizeErrorResponse } from './errorResponse';
import { useCallback } from 'react';
import { Chat } from '../model';

interface HistoryResponse {
    data?: Array<Chat>;
    refetch: () => void;
    isLoading: boolean;
}

const fetchData = () => {
    return axios.get(API_URL.All_CHATS).catch(err => console.log(err));
};

export function useHistory(): HistoryResponse {
    const response = useQuery({
        queryKey: ['history'],
        queryFn: fetchData,
        retry: false,
    });

    const { data, error, isError, refetch, isLoading } = response;

    return {
        ...normalizeErrorResponse(isError, error),
        data: data?.data as Array<Chat>,
        refetch: useCallback(() => refetch({ throwOnError: true }), [refetch]),
        isLoading,
    };
}
