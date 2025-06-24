import React, {useMemo, useState} from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import {AbasSimplex} from "@/components/UI/AbasSimplexList";
import {Activity, BarChart3, Eye, EyeOff, Package, TrendingUp, TrendingUp as LineChartIcon} from 'lucide-react';


const GraficosComparaResultados: React.FC<{ abas: AbasSimplex[] }> = ({abas}) => {
    const [chartType, setChartType] = useState<'line' | 'bar' | 'radar'>('bar');
    const [visibleScenarios, setVisibleScenarios] = useState<Set<number>>(
        new Set(abas.filter(aba => aba.resultado).map(aba => aba.id))
    );

    const scenariosWithResults = useMemo(() =>
        abas.filter(aba => aba.resultado), [abas]
    );

    const chartData = useMemo(() => {
        const visibleData = scenariosWithResults.filter(aba => visibleScenarios.has(aba.id));

        return {
            results: visibleData.map(aba => ({
                scenario: aba.nome,
                resultado: aba.resultado?.resultado || 0,
                modeloA: aba.resultado?.modeloA || 0,
                modeloB: aba.resultado?.modeloB || 0,
                modeloC: aba.resultado?.modeloC || 0,
            })),

            models: visibleData.map(aba => ({
                scenario: aba.nome,
                'Modelo A': aba.resultado?.modeloA || 0,
                'Modelo B': aba.resultado?.modeloB || 0,
                'Modelo C': aba.resultado?.modeloC || 0,
            })),

            slack: visibleData.map(aba => ({
                scenario: aba.nome,
                folgaMaterial: aba.resultado?.folgaMaterial || 0,
                folgaMaoDeObra: (aba.resultado?.folgaMaoDeObra || 0) / 1000,
            })),

            radar: visibleData.map(aba => ({
                scenario: aba.nome,
                'Resultado': Math.min((aba.resultado?.resultado || 0) / 500, 100),
                'Modelo A': Math.min((aba.resultado?.modeloA || 0) * 2, 100),
                'Modelo B': Math.min((aba.resultado?.modeloB || 0) * 2, 100),
                'Modelo C': Math.min((aba.resultado?.modeloC || 0) * 2, 100),
            }))
        };
    }, [scenariosWithResults, visibleScenarios]);

    const toggleScenarioVisibility = (scenarioId: number) => {
        setVisibleScenarios(prev => {
            const newSet = new Set(prev);
            if (newSet.has(scenarioId)) {
                newSet.delete(scenarioId);
            } else {
                newSet.add(scenarioId);
            }
            return newSet;
        });
    };

    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0', '#87d068'];

    if (scenariosWithResults.length === 0) {
        return (
            <div className="p-8 text-center bg-gray-50 rounded-lg">
                <div className="mx-auto h-16 w-16 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                    📊
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum resultado para comparar</h3>
                <p className="text-gray-500">Execute os cálculos em pelo menos um cenário para visualizar as
                    comparações.</p>
            </div>
        );
    }
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('pt-BR').format(value);
    };

    return (
        <div className="space-y-8 w-10/12 mx-auto p-6">
            <div
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400"/>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Comparação de
                                    Cenários</h2>
                                <p className="text-gray-600 dark:text-gray-300 mt-1">Analise e compare os resultados dos
                                    diferentes cenários</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setChartType('bar')}
                                className={`p-3 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                                    chartType === 'bar'
                                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                <BarChart3 className="w-4 h-4"/>
                            </button>
                            <button
                                onClick={() => setChartType('line')}
                                className={`p-3 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                                    chartType === 'line'
                                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                <LineChartIcon className="w-4 h-4"/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <Eye className="w-4 h-4"/>
                        Cenários Visíveis
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {scenariosWithResults.map((aba, index) => (
                            <button
                                key={aba.id}
                                onClick={() => toggleScenarioVisibility(aba.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    visibleScenarios.has(aba.id)
                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 shadow-sm'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{backgroundColor: colors[index % colors.length]}}
                                />
                                {aba.nome}
                                {visibleScenarios.has(aba.id) ? <Eye className="w-4 h-4"/> :
                                    <EyeOff className="w-4 h-4"/>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-bold flex items-center gap-3 text-gray-800 dark:text-gray-100">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                                <TrendingUp className="w-4 h-4"/>
                            </div>
                            Resultado Ótimo
                        </h3>
                    </div>
                    <div className="p-6">
                        <ResponsiveContainer width="100%" height={300}>
                            {chartType === 'bar' ? (
                                <BarChart data={chartData.results}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/>
                                    <XAxis dataKey="scenario" angle={-45} textAnchor="end" height={80}/>
                                    <YAxis/>
                                    <Tooltip formatter={(value) => formatCurrency(Number(value))}/>
                                    <Legend/>
                                    <Bar dataKey="resultado" fill="#10B981" name="Resultado Ótimo"
                                         radius={[4, 4, 0, 0]}/>
                                </BarChart>
                            ) : (
                                <LineChart data={chartData.results}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/>
                                    <XAxis dataKey="scenario"/>
                                    <YAxis/>
                                    <Tooltip formatter={(value) => formatCurrency(Number(value))}/>
                                    <Legend/>
                                    <Line type="monotone" dataKey="resultado" stroke="#10B981" name="Resultado Ótimo"
                                          strokeWidth={3} dot={{r: 6}}/>
                                </LineChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </div>

                <div
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-bold flex items-center gap-3 text-gray-800 dark:text-gray-100">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                                <Activity className="w-4 h-4"/>
                            </div>
                            Produção por Modelo
                        </h3>
                    </div>
                    <div className="p-6">
                        <ResponsiveContainer width="100%" height={300}>
                            {chartType === 'bar' ? (
                                <BarChart data={chartData.models}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/>
                                    <XAxis dataKey="scenario" angle={-45} textAnchor="end" height={80}/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar dataKey="Modelo A" fill="#3B82F6" name="Modelo A" radius={[4, 4, 0, 0]}/>
                                    <Bar dataKey="Modelo B" fill="#10B981" name="Modelo B" radius={[4, 4, 0, 0]}/>
                                    <Bar dataKey="Modelo C" fill="#F59E0B" name="Modelo C" radius={[4, 4, 0, 0]}/>
                                </BarChart>
                            ) : (
                                <LineChart data={chartData.models}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/>
                                    <XAxis dataKey="scenario"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Line type="monotone" dataKey="Modelo A" stroke="#3B82F6" name="Modelo A"
                                          strokeWidth={3} dot={{r: 6}}/>
                                    <Line type="monotone" dataKey="Modelo B" stroke="#10B981" name="Modelo B"
                                          strokeWidth={3} dot={{r: 6}}/>
                                    <Line type="monotone" dataKey="Modelo C" stroke="#F59E0B" name="Modelo C"
                                          strokeWidth={3} dot={{r: 6}}/>
                                </LineChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </div>

                {chartType === 'radar' ? (
                    <div
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden lg:col-span-2">
                    </div>
                ) : (
                    <div
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden lg:col-span-2">
                        <div
                            className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold flex items-center gap-3 text-gray-800 dark:text-gray-100">
                                <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white">
                                    <Package className="w-4 h-4"/>
                                </div>
                                Análise de Folga (Slack)
                            </h3>
                        </div>
                        <div className="p-6">
                            <ResponsiveContainer width="100%" height={300}>
                                {chartType === 'bar' ? (
                                    <BarChart data={chartData.slack}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/>
                                        <XAxis dataKey="scenario" angle={-45} textAnchor="end" height={80}/>
                                        <YAxis/>
                                        <Tooltip
                                            formatter={(value, name) => [
                                                name === 'folgaMaoDeObra' ? `${formatNumber(Number(value))}k` : formatNumber(Number(value)),
                                                name === 'folgaMaterial' ? 'Folga Material' : 'Folga Mão de Obra (k)'
                                            ]}
                                        />
                                        <Legend/>
                                        <Bar dataKey="folgaMaterial" fill="#F59E0B" name="Folga Material"
                                             radius={[4, 4, 0, 0]}/>
                                        <Bar dataKey="folgaMaoDeObra" fill="#EF4444" name="Folga Mão de Obra (k)"
                                             radius={[4, 4, 0, 0]}/>
                                    </BarChart>
                                ) : (
                                    <LineChart data={chartData.slack}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/>
                                        <XAxis dataKey="scenario"/>
                                        <YAxis/>
                                        <Tooltip
                                            formatter={(value, name) => [
                                                name === 'folgaMaoDeObra' ? `${formatNumber(Number(value))}k` : formatNumber(Number(value)),
                                                name === 'folgaMaterial' ? 'Folga Material' : 'Folga Mão de Obra (k)'
                                            ]}
                                        />
                                        <Legend/>
                                        <Line type="monotone" dataKey="folgaMaterial" stroke="#F59E0B"
                                              name="Folga Material" strokeWidth={3} dot={{r: 6}}/>
                                        <Line type="monotone" dataKey="folgaMaoDeObra" stroke="#EF4444"
                                              name="Folga Mão de Obra (k)" strokeWidth={3} dot={{r: 6}}/>
                                    </LineChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {chartData.results.map((scenario, index) => (
                    <div key={scenario.scenario}
                         className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="w-4 h-4 rounded-full shadow-sm"
                                style={{backgroundColor: colors[index % colors.length]}}
                            />
                            <h4 className="font-bold text-gray-900 dark:text-gray-100">{scenario.scenario}</h4>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Resultado:</span>
                                <span
                                    className="font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(scenario.resultado)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Modelo A:</span>
                                <span
                                    className="font-semibold text-blue-600 dark:text-blue-400">{scenario.modeloA}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Modelo B:</span>
                                <span
                                    className="font-semibold text-green-600 dark:text-green-400">{scenario.modeloB}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Modelo C:</span>
                                <span
                                    className="font-semibold text-yellow-600 dark:text-yellow-400">{scenario.modeloC}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GraficosComparaResultados;