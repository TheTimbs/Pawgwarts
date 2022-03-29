import { create } from 'apisauce';

// o: why did you choose to use apisauce? what does it add over axios?
const apiClient = create({
  baseURL: 'http://192.168.1.198:9000/api',
});

export default apiClient;
