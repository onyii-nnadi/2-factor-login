const required = (key) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
};


export const config = {
  port: Number(process.env.PORT || 4000)
};
