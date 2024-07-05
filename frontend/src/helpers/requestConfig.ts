export const RequestConfig = () => {
    let token = window.localStorage.getItem("token");
    token = "Bearer " + token;
    let responseHeader = {
        headers: {
            Authorization: token,
        },
        timeout: 0,
    };
    return responseHeader;
};