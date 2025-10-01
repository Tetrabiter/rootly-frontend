import { http } from "./http";

export const getToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        const token = await http.get<string>("set-user-id").json();
        localStorage.setItem("token", token);
        return token;
    } else {
        return token;
    }
};
