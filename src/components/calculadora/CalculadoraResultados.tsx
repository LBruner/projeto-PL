import React from "react";
import {Activity, ArrowLeft, Clock, DollarSign, Package} from "lucide-react";
import {Resultado} from "@/models/simplex-form-data";
import {Modelo} from "@/helpers/calculadoraForm";
import ModeloResultado from "@/components/UI/ModeloResultado";
import ResultadosResumoItem from "@/components/UI/ResultadosResumo";

interface CalculadoraResultadosProps {
    resultado: Resultado;
    setIsCalculatorVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CalculadoraResultados: React.FC<CalculadoraResultadosProps> = (
    {
        resultado,
        setIsCalculatorVisible
    }) => {
    const models: Modelo[] = [
        {
            name: 'Modelo A',
            key: 'modeloA',
            value: resultado.modeloA ?? 0,
            color: 'from-red-500 to-pink-600',
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            textColor: 'text-red-700 dark:text-red-300'
        },
        {
            name: 'Modelo B',
            key: 'modeloB',
            value: resultado.modeloB ?? 0,
            color: 'from-orange-500 to-yellow-600',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
            textColor: 'text-orange-700 dark:text-orange-300'
        },
        {
            name: 'Modelo C',
            key: 'modeloC',
            value: resultado.modeloC ?? 0,
            color: 'from-teal-500 to-cyan-600',
            bgColor: 'bg-teal-50 dark:bg-teal-900/20',
            textColor: 'text-teal-700 dark:text-teal-300'
        }
    ];

    return (
        <div className="w-11/12 p-6">
            <div className={'absolute z-40'}>
                <button
                    onClick={() => setIsCalculatorVisible(true)}
                    className="absolute -top-4 -left-4 z-10 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group dark:focus:ring-blue-400 dark:focus:ring-offset-gray-800"
                    aria-label="Voltar para calculadora"
                ><ArrowLeft className="text-gray-700 dark:text-gray-300"/>
                </button>
            </div>
            <div className=" mx-auto space-y-2">
                <>
                    <div
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400"/>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Produção por
                                    Modelo</h3>
                            </div>
                        </div>

                        <div className="px-8 py-2">
                            <div className="grid grid-cols-1 gap-4 my-4">
                                {models.map((model) => <ModeloResultado key={model.key} modelo={model}/>)}
                            </div>
                        </div>
                        <div
                            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <Package className="w-6 h-6 text-purple-600 dark:text-purple-400"/>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Resumo Geral</h3>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <ResultadosResumoItem
                                        title="Mão-de-obra"
                                        subtitle="Recurso disponível"
                                        value={typeof resultado.folgaMaoDeObra === 'number' ? resultado.folgaMaoDeObra.toFixed(2) : resultado.folgaMaoDeObra || '-'}
                                        unit="horas de folga"
                                        icon={Clock}
                                        colorScheme="blue"
                                    />
                                    <ResultadosResumoItem
                                        title="Material"
                                        subtitle="Recurso disponível"
                                        value={typeof resultado.folgaMaterial === 'number' ? resultado.folgaMaterial.toFixed(2) : resultado.folgaMaterial || '-'}
                                        unit="kg de folga"
                                        icon={Package}
                                        colorScheme="purple"
                                    />
                                    <ResultadosResumoItem
                                        title="Lucros"
                                        subtitle="Valor final"
                                        value={`R$${typeof resultado.resultado === 'number' ? resultado.resultado.toFixed(2) : resultado.folgaMaterial || '-'}`}
                                        unit="lucros"
                                        icon={DollarSign}
                                        colorScheme="yellow"
                                    />
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