export class ClientError extends Error {
    details;
    constructor(message?: string, details?: string) {
        super(message || "Client Related Error");
        this.name = "ClientError";
        this.details = details;
    }
}
