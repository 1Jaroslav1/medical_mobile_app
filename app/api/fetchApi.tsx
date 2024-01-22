import axios, { AxiosError } from 'axios';
import status from 'http-status';
import { ForbiddenError, NotAuthorizedError, ServerError } from './errors';
import { Toast as ToastAlert } from '../components';

const ServerErrorMessage = 'Server rejected request';

const successHandler = (toast: any) => {
    toast.show({
        placement: 'top',
        render: ({ id }: { id: any }) => {
            return (
                <ToastAlert
                    id={id}
                    title="Success"
                    status="success"
                    variant="solid"
                    isClosable={false}
                />
            );
        },
    });
};

const forbiddenHandler = (toast: any) => {
    toast.show({
        placement: 'top',
        render: ({ id }: { id: any }) => {
            return (
                <ToastAlert
                    id={id}
                    title="Forbidden"
                    description="You are not authorized for requested action"
                    status="error"
                    variant="solid"
                    isClosable={true}
                />
            );
        },
    });
};

const failHandler = (toast: any, message: string | undefined) => {
    toast.show({
        placement: 'top',
        render: ({ id }: { id: any }) => {
            return (
                <ToastAlert
                    id={id}
                    title="Failure"
                    description={message}
                    status="warning"
                    variant="solid"
                    isClosable={true}
                />
            );
        },
    });
};

const unauthorizedHandler = (toast: any) => {
    toast.show({
        placement: 'top',
        render: ({ id }: { id: any }) => {
            return (
                <ToastAlert
                    id={id}
                    title="Unauthorized error"
                    description="Wrong credentials"
                    status="warning"
                    variant="solid"
                    isClosable={true}
                />
            );
        },
    });
};

export const fetchApi = () => {
    return ({ url, method, postData }: Api.FetchConfig, toast: any) => {
        const axiosConfig = {
            url,
            method,
            data: postData,
        };
        return axios(axiosConfig)
            .then(response => {
                return response;
            })
            .catch((error: AxiosError) => {
                const httpStatus: number | undefined = error.response?.status;
                if (!httpStatus) {
                    throw new Error(ServerErrorMessage);
                }

                if (httpStatus === status.UNAUTHORIZED) {
                    unauthorizedHandler(toast);
                    axios.defaults.headers.common['Authorization'] = null;
                    throw new NotAuthorizedError();
                }
                if (httpStatus === status.FORBIDDEN) {
                    forbiddenHandler(toast);
                    throw new ForbiddenError();
                }
                if (
                    httpStatus >= status.BAD_REQUEST &&
                    httpStatus < status.INTERNAL_SERVER_ERROR
                ) {
                    failHandler(
                        toast,
                        (error.response?.data as string) ||
                            'Server rejected request - malformed request format',
                    );
                    throw new Error(ServerErrorMessage);
                }
                if (
                    httpStatus === status.INTERNAL_SERVER_ERROR ||
                    httpStatus === status.SERVICE_UNAVAILABLE
                ) {
                    failHandler(
                        toast,
                        (error.response?.data as string) ||
                            'Cannot handle request',
                    );
                    throw new ServerError(
                        error.response?.statusText || 'Server Error',
                    );
                }
                throw error;
            });
    };
};
