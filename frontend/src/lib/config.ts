// API Configuration
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Production'da sitenizin domain'ini yazın
const PRODUCTION_DOMAIN = 'https://kayizer.com'; // CPANEL_FTP_HOST: kayizer.com

export const API_URL = isProduction 
  ? `${PRODUCTION_DOMAIN}/api`
  : 'http://localhost:3007/api';

export const config = {
  API_URL,
  isDevelopment,
  isProduction
};

// GitHub Actions Secrets (cPanel FTP deployment için):
// CPANEL_FTP_HOST = kayizer.com
// CPANEL_FTP_USER = marinema
// CPANEL_FTP_PASSWORD = your-cpanel-password-here 