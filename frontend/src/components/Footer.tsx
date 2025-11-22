import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, Send } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-20">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">F</span>
                            </div>
                            <span className="font-display font-bold text-xl text-gray-900">Foodzy</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            Foodzy is the biggest market of grocery products. Get your daily needs from our store.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>51 Green St. Huntington oHio beach ontario, NY 11746 KY 4783, USA</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <Mail className="w-4 h-4" />
                            <span>example@email.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>+91 123 4567890</span>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-primary text-sm transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/delivery" className="text-gray-600 hover:text-primary text-sm transition-colors">
                                    Delivery Information
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-gray-600 hover:text-primary text-sm transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-600 hover:text-primary text-sm transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-600 hover:text-primary text-sm transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/support" className="text-gray-600 hover:text-primary text-sm transition-colors">
                                    Support Center
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Category Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Category</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/category/dairy" className="text-gray-600 hover:text-primary text-sm transition-colors">
                                    Dairy & Bakery
                                </Link>
                            </li>
                            <li>
                                <Link href="/category/fruits" className="text-gray-600 hover:text-primary text-sm transition-colors">
                                    Fruits & Vegetable
                                </Link>
                            </li>
                            <li>
                                <Link href="/category/snacks" className="text-gray-600 hover:text-primary text-sm transition-colors">
                                    Snack & Spice
                                </Link>
                            </li>
                            <li>
                                <Link href="/category/juice" className="text-gray-600 hover:text-primary text-sm transition-colors">
                                    Juice & Drinks
                                </Link>
                            </li>
                            <li>
                                <Link href="/category/chicken" className="text-gray-600 hover:text-primary text-sm transition-colors">
                                    Chicken & Meat
                                </Link>
                            </li>
                            <li>
                                <Link href="/category/fast-food" className="text-gray-600 hover:text-primary text-sm transition-colors">
                                    Fast Food
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Subscribe Our Newsletter</h3>
                        <form className="mb-4">
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Search here.."
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                />
                                <button
                                    type="submit"
                                    className="p-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                        <div className="flex gap-3">
                            {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-200 mt-8 pt-6 text-center">
                    <p className="text-sm text-gray-600">
                        © 2025 <span className="text-primary font-semibold">Foodzy</span>. All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};
