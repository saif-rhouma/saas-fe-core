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
    console.log('----> Trigger Request');
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
  dashboard: '/api/analytics',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    application: '/api/auth/application',
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
    approve: '/api/orders/approve/',
  },
  plan: {
    list: '/api/plans/',
    details: '/api/plans/',
    create: '/api/plans/create',
    edit: '/api/plans/',
    transferToStock: '/api/plans/stock/',
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
    edit: '/api/products/',
    delete: '/api/products/',
    productsImages: '/api/files/products',
    stock: '/api/stock/',
  },
  productAddons: {
    list: '/api/product-addons/',
    create: '/api/product-addons/create',
    delete: '/api/product-addons/',
    edit: '/api/product-addons/',
  },
  payments: {
    list: '/api/payments/',
    create: '/api/payments/create',
    delete: '/api/payments/',
    edit: '/api/payments/',
  },
  tickets: {
    list: '/api/tickets/',
    create: '/api/tickets/create',
    details: '/api/tickets/',
    delete: '/api/tickets/',
    close: '/api/tickets/',
    createMessage: '/api/ticket-messages/create',
    analytics: '/api/tickets/analytics',
  },
  reminders: {
    list: '/api/reminders/',
    create: '/api/reminders/create',
    edit: '/api/reminders/',
    delete: '/api/reminders/',
  },
  staff: {
    list: '/api/users/staff',
    create: '/api/users/staff',
    edit: '/api/users/staff',
  },
  files: {
    upload: '/api/files/upload',
  },
  account: {
    edit: '/api/users/',
  },
  master: {
    edit: '/api/applications/',
  },
  stock: {
    products: '/api/stock/',
    details: '/api/stock/details',
  },
  orderStatus: {
    list: '/api/orders-status/',
    edit: '/api/orders-status/',
  },
  planStatus: {
    list: '/api/plans-status/',
    edit: '/api/plans-status/',
  },
  financial: {
    list: '/api/financial/',
    create: '/api/financial/create',
    edit: '/api/financial/',
    delete: '/api/financial/',
  },
};
