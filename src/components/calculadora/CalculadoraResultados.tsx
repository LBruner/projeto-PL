import React from "react";
import {Activity, ArrowLeft, Clock, DollarSign, Package} from "lucide-react";
import {Resultado} from "@/models/simplex-form-data";


interface CalculadoraResultadosProps {
    resultado: Resultado;
    setIsCalculatorVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CalculadoraResultados: React.FC<CalculadoraResultadosProps> = (
    {
        resultado,
        setIsCalculatorVisible
    }) => {
    const models = [
        {
            name: 'Modelo A',
            key: 'modeloA',
            value: resultado.modeloA ?? 0,
            color: 'from-red-500 to-pink-600',
            bgColor: 'bg-red-50',
            textColor: 'text-red-700'
        },
        {
            name: 'Modelo B',
            key: 'modeloB',
            value: resultado.modeloB ?? 0,
            color: 'from-orange-500 to-yellow-600',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-700'
        },
        {
            name: 'Modelo C',
            key: 'modeloC',
            value: resultado.modeloC ?? 0,
            color: 'from-teal-500 to-cyan-600',
            bgColor: 'bg-teal-50',
            textColor: 'text-teal-700'
        }
    ];

    return (
        <div className="w-11/12 p-6">
            <div className={'absolute z-40'}>
                <button
                    onClick={() => setIsCalculatorVisible(true)}
                    className="absolute -top-4 -left-4 z-10 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
                    aria-label="Voltar para calculadora"
                ><ArrowLeft/>
                </button>
            </div>
            <div className=" mx-auto space-y-2">
                <>
                    <div
                        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <Activity className="w-6 h-6 text-blue-600"/>
                                <h3 className="text-xl font-bold text-gray-800">Produção por Modelo</h3>
                            </div>
                        </div>

                        <div className="px-8 py-2">
                            <div className="grid grid-cols-1 gap-4 my-4">
                                {models.map((model) => (
                                    <div key={model.key}
                                         className={`${model.bgColor} rounded-2xl px-6 py-3 border border-gray-100`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${model.color} text-white font-bold text-lg flex items-center justify-center`}>
                                                    {model.name.charAt(model.name.length - 1)}
                                                </div>
                                                <div>
                                                    <div
                                                        className="font-semibold text-gray-800 text-lg">{model.name}</div>
                                                    <div className="text-sm text-gray-500">Unidades a produzir</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-3xl font-bold ${model.textColor}`}>
                                                    {model.value}
                                                </div>
                                                <div className="text-gray-500 text-sm">unidades</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div
                            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-purple-50 to-pink-50 px-8 py-6 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <Package className="w-6 h-6 text-purple-600"/>
                                    <h3 className="text-xl font-bold text-gray-800">Resumo Geral</h3>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div
                                                className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                                                <Clock className="w-5 h-5"/>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-800">Mão-de-obra</div>
                                                <div className="text-sm text-gray-500">Recurso disponível</div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-700">
                                                {typeof resultado.folgaMaoDeObra === 'number' ? resultado.folgaMaoDeObra.toFixed(2) : resultado.folgaMaoDeObra || '-'}
                                            </div>
                                            <div className="text-blue-600 text-sm">horas de folga</div>
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div
                                                className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white">
                                                <Package className="w-5 h-5"/>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-800">Material</div>
                                                <div className="text-sm text-gray-500">Recurso disponível</div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-purple-700">
                                                {typeof resultado.folgaMaterial === 'number' ? resultado.folgaMaterial.toFixed(2) : resultado.folgaMaterial || '-'}
                                            </div>
                                            <div className="text-purple-600 text-sm">kg de folga</div>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 rounded-2xl p-6 border border-purple-100">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div
                                                className="p-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                                                <DollarSign className="w-5 h-5"/>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-800">Lucros</div>
                                                <div className="text-sm text-gray-500">Valor final</div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-yellow-700">
                                                R${typeof resultado.resultado === 'number' ? resultado.resultado.toFixed(2) : resultado.folgaMaterial || '-'}
                                            </div>
                                            <div className="text-yellow-600 text-sm">lucros</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
};

export default CalculadoraResultados;