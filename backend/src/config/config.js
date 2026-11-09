const required = (key) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
};


export const config = {
  port: Number(process.env.PORT || 4000),
  region: process.env.AWS_REGION || 'eu-west-2',
  jwtSecret: required('JWT_SECRET'),
  otpSecret: required('OTP_SECRET'),
  usersTable: process.env.USERS_TABLE || 'mfa-users',
  otpTable: process.env.OTP_TABLE || 'mfa-otp',
  queueUrl: required('EMAIL_QUEUE_URL'),
  sesFrom: required('SES_FROM_ADDRESS'),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  otpTtlSeconds: 300,
  maxOtpAttempts: 5,
  sessionTtl: '1h',
};
