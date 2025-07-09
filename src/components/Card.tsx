import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'lg'
}) => {
  const baseClasses = "rounded-2xl transition-all duration-200";
  
  const variantClasses = {
    default: "bg-white/95 backdrop-blur-md shadow-lg hover:shadow-xl",
    elevated: "bg-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-1",
    outlined: "bg-white border-2 border-gray-200 hover:border-emerald-300"
  };
  
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10"
  };
  
  const finalClassName = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`;
  
  return (
    <div className={finalClassName}>
      {children}
    </div>
  );
};

export default Card; 