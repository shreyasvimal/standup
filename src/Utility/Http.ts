import axios from 'axios';

export const doPost = (url: string, data: any) => (
    axios.post(url, data)
);