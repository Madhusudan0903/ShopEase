const config = {
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
  apiBaseURL: process.env.API_BASE_URL || 'http://localhost:3000/api',

  credentials: {
    validUser: {
      email: process.env.USER_EMAIL || 'testuser@example.com',
      password: process.env.USER_PASSWORD || 'Test@1234',
      firstName: 'Test',
      lastName: 'User',
    },
    adminUser: {
      email: process.env.ADMIN_EMAIL || 'admin@shopease.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@1234',
      firstName: 'Admin',
      lastName: 'User',
    },
  },

  timeouts: {
    short: 5000,
    medium: 10000,
    long: 30000,
    pageLoad: 15000,
    animation: 1000,
  },
};

module.exports = config;
