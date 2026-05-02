'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  MapPin, 
  Check,
  Lock,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart, addNotification } = useStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const total = getCartTotal();
  const shipping = total > 999 ? 0 : 99;
  const finalTotal = total + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process payment
      addNotification('Order placed successfully! Check your email for details.', 'success');
      clearCart();
      // Redirect to home or account
      setTimeout(() => {
        window.location.href = '/account';
      }, 2000);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/" className="text-accent-cyan hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-surface border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {['Shipping', 'Payment', 'Confirm'].map((label, index) => (
            <div key={label} className="flex items-center">
              <div className={`flex items-center gap-2 ${step > index + 1 ? 'text-accent-green' : step === index + 1 ? 'text-accent-cyan' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step > index + 1 
                    ? 'bg-accent-green text-black' 
                    : step === index + 1 
                      ? 'bg-accent-cyan text-black' 
                      : 'bg-surface'
                }`}>
                  {step > index + 1 ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span className="hidden sm:inline">{label}</span>
              </div>
              {index < 2 && <div className={`w-16 h-0.5 mx-4 ${step > index + 1 ? 'bg-accent-green' : 'bg-surface'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Shipping */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="font-display text-2xl font-bold mb-6">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:outline-none focus:border-accent-cyan"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:outline-none focus:border-accent-cyan"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:outline-none focus:border-accent-cyan"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:outline-none focus:border-accent-cyan"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:outline-none focus:border-accent-cyan"
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:outline-none focus:border-accent-cyan"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:outline-none focus:border-accent-cyan"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm text-gray-400 mb-2">PIN Code</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:outline-none focus:border-accent-cyan"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="font-display text-2xl font-bold mb-6">Payment Method</h2>
                  
                  <div className="p-4 bg-surface rounded-xl border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <CreditCard className="w-5 h-5 text-accent-cyan" />
                      <span className="font-medium">Card Details</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl focus:outline-none focus:border-accent-cyan"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Expiry</label>
                          <input
                            type="text"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl focus:outline-none focus:border-accent-cyan"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl focus:outline-none focus:border-accent-cyan"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Lock className="w-4 h-4" />
                    Your payment is secure and encrypted
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirm */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="font-display text-2xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="p-6 bg-surface rounded-xl space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Shipping to</span>
                      <span>{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Address</span>
                      <span className="text-right">{formData.address}, {formData.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Payment</span>
                      <span>Card ending in {formData.cardNumber.slice(-4)}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border border-white/10 rounded-full hover:bg-white/5 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  {step === 3 ? 'Place Order' : 'Continue'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-surface rounded-2xl">
              <h3 className="font-display text-xl font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-light">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className="gradient-text">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-gray-500 mt-4">
                  Add ₹{1000 - total} more for free shipping
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}