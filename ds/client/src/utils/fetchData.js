import axios from 'axios';

axios.defaults.withCredentials = true;

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`/api/${url}`, {
        headers: { Authorization: token }
    })
    return res;
}


export const postDataAPI = async (url, post, token) => {
    let res;
    try {
        res = await axios.post(`/${url}`, post, {
            headers: { Authorization: token }
        });
    } catch (error) {
        if (error.response) {
            console.error('Request failed:', error.response.data);
            res = error.response;
        } else {
            throw error;
        }
    }
    return res;
};

export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(`/api/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const patchDataAPI = async (url, post, token) => {
    const res = await axios.patch(`/api/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`/api/${url}`, {
        headers: { Authorization: token}
    })
    return res;
}