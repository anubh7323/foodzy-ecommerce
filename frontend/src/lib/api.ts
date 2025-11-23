import axios from 'axios';
import { Product, LoginDto, VerifyOtpDto, AuthResponse, CreateOrderDto, Order } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
            const { state } = JSON.parse(authStorage);
            if (state?.accessToken) {
                config.headers.Authorization = `Bearer ${state.accessToken}`;
            }
        }
    }
    return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear auth on 401
            if (typeof window !== 'undefined') {
                localStorage.removeItem('auth-storage');
                window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error);
    }
);

// Product APIs
export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get<Product[]>('/products');
        if (!response || !response.data) {
            console.warn('fetchProducts: No data received', response);
            return [];
        }
        return response.data;
    } catch (error) {
        console.error('fetchProducts error:', error);
        throw error;
    }
};

export const fetchProductById = async (id: string): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
};

export const fetchCategories = async (): Promise<string[]> => {
    const { data } = await api.get<string[]>('/products/categories/all');
    return data;
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    const { data } = await api.get<Product[]>(`/products/category/${category}`);
    return data;
};

export const seedProducts = async (): Promise<void> => {
    await api.post('/products/seed');
};

// Auth APIs
export const sendOTP = async (dto: LoginDto): Promise<void> => {
    await api.post('/auth/login', dto);
};

export const verifyOTP = async (dto: VerifyOtpDto): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/verify', dto);
    return data;
};

// Order APIs
export const createOrder = async (dto: CreateOrderDto): Promise<Order> => {
    const { data } = await api.post<Order>('/orders', dto);
    return data;
};

export const fetchOrders = async (): Promise<Order[]> => {
    const { data } = await api.get<Order[]>('/orders');
    return data;
};

export default api;
