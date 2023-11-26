export class ForbiddenError extends Error {
    constructor(message?: string) {
        super(message || "Access Forbidden");
        this.name = "ForbiddenError";
    }
}
