export class ServerError extends Error {
    details;
    constructor(message?: string, details?: string) {
        super(message || "Internal Server Error");
        this.name = "ServerError";
        this.details = details;
    }
}
