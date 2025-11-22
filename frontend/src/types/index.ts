// Product Types
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    isAvailable: boolean;
    createdAt: string;
    category?: string;
    rating?: number;
    reviewCount?: number;
}

// Cart Types
export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

// Order Types
export interface OrderItem {
    productId: string;
    quantity: number;
}

export interface CreateOrderDto {
    items: OrderItem[];
    shippingAddress: string;
    paymentMethod: string;
}

export interface Order {
    id: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    items: {
        id: string;
        quantity: number;
        priceAtPurchase: number;
        product: Product;
    }[];
}

// Auth Types
export interface User {
    id: string;
    email: string;
    name?: string;
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
}

export interface LoginDto {
    email: string;
}

export interface VerifyOtpDto {
    email: string;
    code: string;
}

export interface AuthResponse {
    accessToken: string;
}

// API Response Types
export interface ApiResponse<T> {
    data: T;
    message?: string;
}

export interface ApiError {
    message: string;
    statusCode: number;
    error?: string;
}
