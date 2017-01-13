let baseURL = 'http://localhost:3001';
if (process.env.NODE_ENV === 'production') {
    baseURL = location.origin.replace(/^https/, 'http');
}

export { baseURL };
