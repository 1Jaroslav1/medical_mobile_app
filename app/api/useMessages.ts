import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from './api';
import { normalizeErrorResponse } from './errorResponse';
import { useCallback } from 'react';
import { Message } from '../model';
import { AxiosResponse } from 'axios';

interface MessageResponse {
    data?: Array<Message>;
    refetch: () => void;
    isLoading: boolean;
}

const fetchData = (
    chatId: number | null,
): Promise<void | AxiosResponse<Array<Message>> | null> => {
    if (chatId === null) {
        return Promise.resolve(null);
    }
    return axios
        .get<Array<Message>>(API_URL.ALL_CHAT_MESSAGES + chatId)
        .catch(err => console.log(err));
};

export function useMessages(chatId: number | null): MessageResponse {
    const response = useQuery({
        queryKey: [`message:${chatId}`],
        queryFn: () => fetchData(chatId),
        retry: false,
        enabled: chatId !== undefined,
    });

    const { data, error, isError, refetch, isLoading } = response;

    return {
        ...normalizeErrorResponse(isError, error),
        data: data?.data as Array<Message>,
        refetch: useCallback(() => refetch({ throwOnError: true }), [refetch]),
        isLoading,
    };
}
