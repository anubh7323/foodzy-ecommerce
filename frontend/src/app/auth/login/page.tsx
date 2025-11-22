'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { sendOTP, verifyOTP } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const [step, setStep] = React.useState<'email' | 'otp'>('email');
    const [email, setEmail] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await sendOTP({ email });
            setStep('otp');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await verifyOTP({ email, code: otp });
            setAuth({ id: '', email, name: '' }, response.accessToken);
            router.push('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid OTP');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                        Welcome to Foodzy
                    </h1>
                    <p className="text-gray-600">
                        {step === 'email'
                            ? 'Enter your email to receive a one-time password'
                            : 'Enter the OTP sent to your email'}
                    </p>
                </div>

                <div className="card p-8">
                    {step === 'email' ? (
                        <form onSubmit={handleSendOTP} className="space-y-4">
                            <Input
                                type="email"
                                label="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                error={error}
                            />
                            <Button type="submit" className="w-full" isLoading={isLoading}>
                                Send OTP
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOTP} className="space-y-4">
                            <div className="text-sm text-gray-600 mb-4">
                                OTP sent to <span className="font-semibold">{email}</span>
                                <button
                                    type="button"
                                    onClick={() => setStep('email')}
                                    className="text-primary hover:underline ml-2"
                                >
                                    Change
                                </button>
                            </div>

                            <Input
                                type="text"
                                label="One-Time Password"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter 6-digit code"
                                maxLength={6}
                                required
                                error={error}
                            />

                            <Button type="submit" className="w-full" isLoading={isLoading}>
                                Verify & Login
                            </Button>

                            <button
                                type="button"
                                onClick={handleSendOTP}
                                disabled={isLoading}
                                className="w-full text-sm text-primary hover:underline"
                            >
                                Resend OTP
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
