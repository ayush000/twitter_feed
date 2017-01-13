import { baseURL } from './constants';
import io from 'socket.io-client';
export const socket = io(baseURL);
