const BACKEND_HOST = process.env.BACKEND_HOST || 'localhost'
const BACKEND_PORT = process.env.BACKEND_PORT || '8080'
const APP_HOST = process.env.APP_HOST || 'localhost'
const APP_PORT = process.env.APP_PORT || '8081'
export const BACKEND_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}`
export const APP_URL = `http://${APP_HOST}:${APP_PORT}`
export const API_URL = `${BACKEND_URL}/api`
