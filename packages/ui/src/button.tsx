import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button 
        ref={ref} 
        className={`px-4 py-2 font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${className || ''}`} 
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
