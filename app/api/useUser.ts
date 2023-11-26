import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from './api';
import { normalizeErrorResponse } from './errorResponse';
import { useCallback } from 'react';
import { User } from '../model';

interface UserResponse {
    data?: User;
    refetch: () => void;
    isLoading: boolean;
}

const fetchData = () => {
    return axios.get(API_URL.USER_DETAILS).catch(err => console.log(err));
};

export function useUser(): UserResponse {
    const response = useQuery({
        queryKey: ['user'],
        queryFn: fetchData,
        retry: false,
    });

    const { data, error, isError, refetch, isLoading } = response;

    return {
        ...normalizeErrorResponse(isError, error),
        data: data?.data as User,
        refetch: useCallback(() => refetch({ throwOnError: true }), [refetch]),
        isLoading,
    };
}
