import React from "react";

interface CustomButtonProps {
    children: React.ReactNode;
    onPress?: () => void;
    className?: string;
    [key: string]: any;
}

const CustomButton:React.FC<CustomButtonProps> = ({children, onPress, className, ...props}) => (
    <button
        onClick={onPress}
        className={`${className} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200`}
        {...props}
    >
        {children}
    </button>
);

export default CustomButton;