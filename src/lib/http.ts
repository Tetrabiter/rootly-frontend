import ky from "ky";

export interface ErrorResponse {
    error: string;
}

export type Response<T> = T | ErrorResponse;

export const http = ky.create({
    prefixUrl: import.meta.env.VITE_BACKEND_HTTP,
    timeout: 10000,
    retry: 3,
    credentials: "include",
    hooks: {
        beforeError: [
            async (error) => {
                const response = await error.response.json<ErrorResponse>();
                if (response.error) error.message = response.error;
                return error;
            },
        ],
    },
});
