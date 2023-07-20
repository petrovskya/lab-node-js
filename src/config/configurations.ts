const configurations = () => ({
  PORT: process.env.PORT,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  ENVIRONMENT: process.env.ENVIRONMENT,
});

export default configurations;
