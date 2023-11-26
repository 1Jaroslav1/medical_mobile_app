export class NotAuthorizedError extends Error {
    constructor(message?: string) {
        super(message || "Authentication is required");
        this.name = "Not Authorized Error";
    }
}
