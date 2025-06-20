import React, {ChangeEventHandler} from "react";

interface SimplexInputProps {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const SimplexInput:React.FC<SimplexInputProps> = ({value, onChange, className = ""}) => (
    <input
        required={true}
        min={0}
        type="number"
        value={value}
        onChange={onChange}
        placeholder="0"
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70 ${className}`}
    />
);

export default SimplexInput;