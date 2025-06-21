import React from 'react';
import {LucideIcon} from 'lucide-react';

interface SummaryCardProps {
    title: string;
    subtitle: string;
    value: string | number;
    unit: string;
    icon: LucideIcon;
    colorScheme: 'blue' | 'purple' | 'yellow';
}

const ResultadosResumoItem: React.FC<SummaryCardProps> = (
    {
        title,
        subtitle,
        value,
        unit,
        icon: Icon,
        colorScheme
    }) => {
    const colorConfig = {
        blue: {
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            borderColor: 'border-blue-100 dark:border-blue-800/50',
            gradientColor: 'from-blue-500 to-indigo-600',
            textColor: 'text-blue-700 dark:text-blue-300',
            unitColor: 'text-blue-600 dark:text-blue-400'
        },
        purple: {
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            borderColor: 'border-purple-100 dark:border-purple-800/50',
            gradientColor: 'from-purple-500 to-violet-600',
            textColor: 'text-purple-700 dark:text-purple-300',
            unitColor: 'text-purple-600 dark:text-purple-400'
        },
        yellow: {
            bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
            borderColor: 'border-yellow-100 dark:border-yellow-800/50',
            gradientColor: 'from-yellow-500 to-yellow-600',
            textColor: 'text-yellow-700 dark:text-yellow-300',
            unitColor: 'text-yellow-600 dark:text-yellow-400'
        }
    };

    const colors = colorConfig[colorScheme];

    return (
        <div className={`${colors.bgColor} rounded-2xl p-6 border ${colors.borderColor}`}>
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${colors.gradientColor} text-white shadow-lg`}>
                    <Icon className="w-5 h-5"/>
                </div>
                <div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100">{title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</div>
                </div>
            </div>
            <div className="text-center">
                <div className={`text-2xl font-bold ${colors.textColor}`}>
                    {value}
                </div>
                <div className={`${colors.unitColor} text-sm`}>{unit}</div>
            </div>
        </div>
    );
};

export default ResultadosResumoItem;