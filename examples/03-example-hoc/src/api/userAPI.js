import { fetchWithDelay } from './fetch';
const url = 'https://jsonplaceholder.typicode.com/users';

const fetchUsers = () => fetchWithDelay(url);

export const userAPI = {
  fetchUsers,
};