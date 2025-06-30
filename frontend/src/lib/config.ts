// API Configuration
const isDevelopment = true; // Will be set to false in production build
const isProduction = false; // Will be set to true in production build

// Production domain
const PRODUCTION_DOMAIN = 'https://marinemanagementsystem.com';

// For development, use localhost. For production, use domain
export const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3007/api'
  : `${PRODUCTION_DOMAIN}/api`;

export const config = {
  API_URL,
  isDevelopment,
  isProduction
};

// GitHub Actions Secrets (cPanel FTP deployment için):
// CPANEL_FTP_HOST = kayizer.com
// CPANEL_FTP_USER = marinema
// CPANEL_FTP_PASSWORD = your-cpanel-password-here 