export interface ChatRequest {
    userId: string;
    message: string;
}

export interface ChatResponse {
    userId: string;
    response: string;
    timestamp: Date;
}