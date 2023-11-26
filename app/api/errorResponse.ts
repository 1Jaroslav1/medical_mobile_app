import {
    ServerError,
    NotAuthorizedError,
    ForbiddenError,
    ClientError,
} from './errors';
import { ErrorResponse } from './types';

export function normalizeErrorResponse(
    isError: boolean,
    error: unknown,
): ErrorResponse {
    if (!isError) {
        return { isError: false };
    }

    return {
        isError: true,
        hasServerError: error instanceof ServerError,
        hasForbiddenError: error instanceof ForbiddenError,
        hasNotAuthorized: error instanceof NotAuthorizedError,
        hasCLientError: error instanceof ClientError,
    } as ErrorResponse;
}
