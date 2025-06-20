import { Resultado } from "@/models/simplex-form-data";
import React from "react";
import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

interface CalculadoraResultadosProps{
    resultado: Resultado;
}

const CalculadoraResultados: React.FC<CalculadoraResultadosProps> = ({resultado}) => {
    return (
        <div className="flex items-center">
            <div className="bg-blue-50 p-8 rounded-xl shadow-lg dark:bg-customDarkFooter">
                <h2 className="text-xl font-bold text-blue-800 mb-4">Resultado da Otimização</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p><strong>Modelo A:</strong> {resultado.modeloA ?? 0} unidades</p>
                        <p><strong>Modelo B:</strong> {resultado.modeloB ?? 0} unidades</p>
                        <p><strong>Modelo C:</strong> {resultado.modeloC ?? 0} unidades</p>
                    </div>
                    <div>
                        <p><strong>Lucro máximo:</strong> <span className="text-green-700 font-semibold">${resultado.result ?? 0}</span></p>
                        <p><strong>Folga mão-de-obra:</strong> {resultado.folgaMaoDeObra ?? '-'} h</p>
                        <p><strong>Folga material:</strong> {resultado.folgaMaterial ?? '-'} kg</p>
                    </div>
                </div>

                <div className={'flex gap-2'}>

                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={[
                            { modelo: 'A', unidades: resultado.modeloA ?? 0 },
                            { modelo: 'B', unidades: resultado.modeloB ?? 0 },
                            { modelo: 'C', unidades: resultado.modeloC ?? 0 },
                        ]}>
                            <XAxis dataKey="modelo" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="unidades" fill="#2563eb" />
                        </BarChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={[
                            { modelo: 'A', unidades: resultado.modeloA ?? 0 },
                            { modelo: 'B', unidades: resultado.modeloB ?? 0 },
                            { modelo: 'C', unidades: resultado.modeloC ?? 0 },
                        ]}>
                            <XAxis dataKey="modelo" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="unidades" fill="#2563eb" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default CalculadoraResultados;