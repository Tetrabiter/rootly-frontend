import ky from "ky";
import { getToken } from "./getToken";

export interface ErrorResponse {
    error: string;
}

export type Response<T> = T | ErrorResponse;

export const http = ky.create({
    prefixUrl: import.meta.env.VITE_BACKEND_HTTP,
    timeout: 10000,
    retry: 3,
    hooks: {
        beforeRequest: [
            async (req) => {
                const token = localStorage.getItem("token") as string;
                req.headers.set("user_id", token);
            },
        ],
        beforeError: [
            async (error) => {
                const response = await error.response.json<ErrorResponse>();
                if (response.error) error.message = response.error;
                return error;
            },
        ],
    },
});
