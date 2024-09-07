import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/oders',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    // signIn: '/api/auth/sign-in',
    signIn: '/api/auth/login',
    signUp: '/api/auth/sign-up',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  order: {
    list: '/api/orders/',
    create: '/api/orders/create',
    delete: '/api/orders/',
    details: '/api/orders/',
    analytics: '/api/orders/analytics',
  },
  plan: {
    list: '/api/plans/',
    details: '/api/plans/',
    create: '/api/plans/create',
  },
  customers: {
    list: '/api/customers/',
    details: '/api/customers/',
    create: '/api/customers/create',
    delete: '/api/customers/',
    edit: '/api/customers/',
  },
  products: {
    list: '/api/products/',
    details: '/api/products/',
    create: '/api/products/create',
    delete: '/api/products/',
    productsImages: '/api/files/products',
  },
  payments: {
    list: '/api/payments/',
    create: '/api/payments/create',
    details: '/api/plans/',
  },
  tickets: {
    list: '/api/tickets/',
    create: '/api/tickets/create',
    details: '/api/tickets/',
    analytics: '/api/tickets/analytics',
  },
  files: {
    upload: '/api/files/upload',
  },
};
