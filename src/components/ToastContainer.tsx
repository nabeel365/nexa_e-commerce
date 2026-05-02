'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info, XCircle, X } from 'lucide-react';
import { useStore } from '@/store/useStore';

export function ToastContainer() {
  const { notifications, removeNotification } = useStore();

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto"
          >
            <div className="relative group overflow-hidden">
              {/* Glassmorphism Background */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl" />
              
              {/* Glow Effect */}
              <div className={`absolute inset-0 opacity-20 bg-gradient-to-r ${
                notification.type === 'success' ? 'from-accent-cyan to-accent-purple' :
                notification.type === 'error' ? 'from-red-500 to-pink-500' :
                'from-blue-500 to-indigo-500'
              }`} />

              <div className="relative px-6 py-4 flex items-center gap-4 min-w-[320px]">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  notification.type === 'success' ? 'bg-accent-cyan/20 text-accent-cyan' :
                  notification.type === 'error' ? 'bg-red-500/20 text-red-500' :
                  'bg-blue-500/20 text-blue-500'
                }`}>
                  {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
                  {notification.type === 'error' && <XCircle className="w-5 h-5" />}
                  {notification.type === 'info' && <Info className="w-5 h-5" />}
                </div>

                <div className="flex-1">
                  <p className="font-medium text-white">{notification.message}</p>
                </div>

                <button
                  onClick={() => removeNotification(notification.id)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Progress Bar */}
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 3, ease: "linear" }}
                  className={`absolute bottom-0 left-0 right-0 h-1 origin-left ${
                    notification.type === 'success' ? 'bg-accent-cyan' :
                    notification.type === 'error' ? 'bg-red-500' :
                    'bg-blue-500'
                  }`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
