import React from "react";
import {Modelo} from "@/helpers/calculadoraForm";

interface ModeloResultadoProps {
    modelo: Modelo
};

const ModeloResultado: React.FC<ModeloResultadoProps> = ({modelo}) => {
    return (
        <div key={modelo.key}
             className={`${modelo.bgColor} rounded-2xl px-6 py-3 border border-gray-100 dark:border-gray-700/50`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${modelo.color} text-white font-bold text-lg flex items-center justify-center shadow-lg`}>
                        {modelo.name.charAt(modelo.name.length - 1)}
                    </div>
                    <div>
                        <div
                            className="font-semibold text-gray-800 dark:text-gray-100 text-lg">{modelo.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Unidades a produzir</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className={`text-3xl font-bold ${modelo.textColor}`}>
                        {modelo.value}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">unidades</div>
                </div>
            </div>
        </div>
    )
}

export default ModeloResultado;