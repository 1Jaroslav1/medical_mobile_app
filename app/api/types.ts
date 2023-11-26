export type ErrorResponse = {
    isError: boolean;
    hasServerError?: boolean;
    hasForbiddenError?: boolean;
    hasNotAuthorized?: boolean;
    hasCLientError?: boolean;
};
