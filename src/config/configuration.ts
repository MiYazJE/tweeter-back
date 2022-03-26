export default () => ({
  port: parseInt(process.env.PORT, 10) || 3005,
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27018',
    database: process.env.MONGO_DATABASE || 'tweeter-dev',
  },
  jwt: {
    secretKey: 'SECRET_KEY',
    signOptions: {
      expiresIn: '1d',
    },
  },
});
