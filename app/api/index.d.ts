/* eslint-disable @typescript-eslint/no-unused-vars */

namespace Api {
    type ErrorResponseJson = {
        status?: string;
        _err?: {
            msg?: string;
            title?: string;
            descr?: string;
            issues?: Array<IssueDescriptor>;
            fieldErrors: Record<string, Array<string>>;
            globalErrors: Array<stirng>;
        };
    };
    type ResponseJson = ErrorResponseJson | object | null;
    type AuthToken = string | undefined;
    type FetchConfig = {
        url: string;
        method: string;
        postData?: object;
        options?: object;
        token?: AuthToken;
    };
}
