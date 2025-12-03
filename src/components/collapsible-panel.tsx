import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ChevronDown } from 'lucide-react';
import { cn } from './ui/utils';

interface CollapsiblePanelProps {
  children: React.ReactNode;
  isMinimized: boolean;
  onRestore: () => void;
  className?: string;
  type?: 'options' | 'animation';
}

export const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({
  children,
  isMinimized,
  onRestore,
  className,
  type = 'options'
}) => {
  return (
    <AnimatePresence mode="wait">
      {!isMinimized ? (
        <motion.div
          key="expanded"
          initial={{ opacity: 1, height: 'auto' }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className={cn('w-full overflow-hidden', className)}
        >
          {children}
        </motion.div>
      ) : type === 'options' ? (
        <motion.button
          key="minimized-bar"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          onClick={onRestore}
          className={cn(
            'w-full flex items-center justify-center gap-2',
            'bg-gradient-to-r from-[#164293] to-[#89037A]',
            'text-white py-3 px-4 rounded-lg',
            'shadow-md hover:shadow-lg',
            'transition-all duration-200',
            'hover:scale-[1.02] active:scale-[0.98]',
            'group'
          )}
          aria-label="Show options"
          title="Show options"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">Show Options</span>
          <motion.div
            animate={{ y: [0, 2, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: 'easeInOut'
            }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
};
