import React from 'react';

const GameButton = ({ label, onClick, variant = 'default', disabled = false }) => {
    const baseStyles = "px-4 py-2 rounded font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";

    const variants = {
        default: "bg-blue-600 hover:bg-blue-500 text-white focus:ring-blue-500",
        danger: "bg-red-600 hover:bg-red-500 text-white animate-pulse focus:ring-red-500",
        special: "bg-purple-600 hover:bg-purple-500 text-white border-2 border-yellow-400 focus:ring-purple-500",
    };

    const disabledStyles = "opacity-50 cursor-not-allowed grayscale";

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant] || variants.default} ${disabled ? disabledStyles : ''}`}
        >
            {label}
        </button>
    );
};

export default GameButton;
