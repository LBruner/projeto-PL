import React, {ChangeEvent} from "react";
import {Calculator, Clock, DollarSign, Package, PersonStanding, Settings, Zap} from "lucide-react";
import SimplexInput from "@/components/UI/SimplexInput";
import {SimplexFormData} from "@/models/simplex-form-data";
import {calculadoraModels} from "@/helpers/calculadoraForm";
import CustomButton from "@/components/UI/CustomButton";

interface CalculadoraFormProps {
    formData:SimplexFormData;
    handleChange: (e: ChangeEvent<HTMLInputElement>, categoria: keyof SimplexFormData, index?: number) => void;
    calcularResultados: () => Promise<void>;
}

export const calculadoraCategories = [
    {
        key: 'lucro',
        label: 'Lucro',
        icon: DollarSign,
        unit: '$',
        color: 'from-green-500 to-emerald-600',
        bgColor: 'bg-green-50'
    },
    {
        key: 'maoDeObra',
        label: 'Mão-de-obra',
        icon: PersonStanding,
        unit: 'h',
        color: 'from-blue-500 to-indigo-600',
        bgColor: 'bg-blue-50'
    },
    {
        key: 'material',
        label: 'Material',
        icon: Package,
        unit: 'kg',
        color: 'from-purple-500 to-violet-600',
        bgColor: 'bg-purple-50'
    }
];


const CalculadoraForm: React.FC<CalculadoraFormProps> = ({formData,handleChange, calcularResultados}) => {
    return (
        <div className="w-11/12 px-6">
            <div className="mx-auto">
                <div
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-50 to-slate-100 dark:from-gray-700 dark:to-gray-800 px-8 py-4 border-b border-gray-200 dark:border-gray-600">
                        <div className="grid grid-cols-4 gap-6 items-center justify-center">
                            <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100 flex items-center gap-2">
                                <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400"/>
                                Parâmetros
                            </h3>
                            {calculadoraModels.map((model, index) => (
                                <div key={model} className="text-center">
                                    <div
                                        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r ${
                                            index === 0 ? 'from-red-500 to-pink-600' :
                                                index === 1 ? 'from-orange-500 to-yellow-600' :
                                                    'from-teal-500 to-cyan-600'
                                        } text-white font-bold text-sm mb-2`}>
                                        {model.charAt(model.length - 1)}
                                    </div>
                                    <div className="font-semibold text-gray-700 dark:text-gray-300">{model}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="px-8 py-4 space-y-4">
                        {calculadoraCategories.map(({key, label, icon: Icon, unit, color, bgColor}) => (
                            <div key={key} className={`${bgColor} dark:bg-gray-700/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-600`}>
                                <div className="grid grid-cols-4 gap-6 items-center">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-xl bg-gradient-to-r ${color} text-white`}>
                                            <Icon className="w-5 h-5"/>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-800 dark:text-gray-100">{label}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">({unit})</div>
                                        </div>
                                    </div>

                                    {[0, 1, 2].map((i) => (
                                        <div key={i} className="relative">
                                            <SimplexInput
                                                // @ts-ignore
                                                value={formData[key as keyof SimplexFormData][i]}
                                                onChange={(e) => handleChange(e as any, key as keyof SimplexFormData, i)}
                                                className="text-center font-medium hover:shadow-md dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 dark:hover:bg-gray-500"
                                            />
                                            <div
                                                className="absolute -top-2 -right-2 text-xs text-gray-400 dark:text-gray-300 bg-white dark:bg-gray-600 rounded-full w-5 h-5 flex items-center justify-center border dark:border-gray-500">
                                                {unit}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-gray-50 to-slate-100 dark:from-gray-700 dark:to-gray-800 px-8 py-4 border-t border-gray-200 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400"/>
                            Limites de Recursos
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-600">
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                                        <Clock className="w-4 h-4"/>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800 dark:text-gray-100">Limite de Mão-de-obra</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Horas disponíveis</div>
                                    </div>
                                </div>
                                <SimplexInput
                                    value={formData.limiteMaoDeObra}
                                    onChange={(e) => handleChange(e as any, 'limiteMaoDeObra')}
                                    className="font-medium text-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                                />
                            </div>

                            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-600">
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 text-white">
                                        <Package className="w-4 h-4"/>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800 dark:text-gray-100">Limite de Material</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Quilogramas disponíveis</div>
                                    </div>
                                </div>
                                <SimplexInput
                                    value={formData.limiteMaterial}
                                    onChange={(e) => handleChange(e as any, 'limiteMaterial')}
                                    className="font-medium text-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700">
                        <CustomButton
                            onPress={calcularResultados}
                            className="w-full bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3 text-lg border dark:border-gray-600"
                        >
                            <Calculator className="w-5 h-5"/>
                            Calcular Produção
                            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalculadoraForm;