'use client';

import { useState, ChangeEvent } from 'react';

type FormData = {
    lucro: number[];
    maoDeObra: number[];
    material: number[];
    limiteMaoDeObra: number;
    limiteMaterial: number;
};

type Resultado = {
    modeloA?: number;
    modeloB?: number;
    modeloC?: number;
    result?: number;
};

export default function Home() {
    const [form, setForm] = useState<FormData>({
        lucro: [4, 2, 3],
        maoDeObra: [7, 3, 6],
        material: [4, 4, 5],
        limiteMaoDeObra: 150,
        limiteMaterial: 200,
    });

    const [resultado, setResultado] = useState<Resultado | null>(null);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        categoria: keyof FormData,
        index?: number
    ) => {
        const value = parseFloat(e.target.value);
        setForm((prev) => {
            if (index !== undefined && Array.isArray(prev[categoria])) {
                const updatedArray = [...(prev[categoria] as number[])];
                updatedArray[index] = value;
                return { ...prev, [categoria]: updatedArray };
            } else {
                return { ...prev, [categoria]: value };
            }
        });
    };

    const calcular = async () => {
        const res = await fetch('/api/calcular-lpi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        const data: Resultado = await res.json();
        setResultado(data);
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Otimizador de Produção</h1>

            <div className="grid grid-cols-4 gap-2 mb-4">
                <div></div>
                <span>Modelo A</span>
                <span>Modelo B</span>
                <span>Modelo C</span>

                <label>Lucro ($)</label>
                {[0, 1, 2].map((i) => (
                    <input
                        key={i}
                        type="number"
                        value={form.lucro[i]}
                        onChange={(e) => handleChange(e, 'lucro', i)}
                        className="border p-1"
                    />
                ))}

                <label>Mão-de-obra (h)</label>
                {[0, 1, 2].map((i) => (
                    <input
                        key={i}
                        type="number"
                        value={form.maoDeObra[i]}
                        onChange={(e) => handleChange(e, 'maoDeObra', i)}
                        className="border p-1"
                    />
                ))}

                <label>Material (kg)</label>
                {[0, 1, 2].map((i) => (
                    <input
                        key={i}
                        type="number"
                        value={form.material[i]}
                        onChange={(e) => handleChange(e, 'material', i)}
                        className="border p-1"
                    />
                ))}
            </div>

            <div className="mb-4">
                <label className="block">Limite de mão-de-obra (h):</label>
                <input
                    type="number"
                    value={form.limiteMaoDeObra}
                    onChange={(e) => handleChange(e, 'limiteMaoDeObra')}
                    className="border p-1 w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block">Limite de material (kg):</label>
                <input
                    type="number"
                    value={form.limiteMaterial}
                    onChange={(e) => handleChange(e, 'limiteMaterial')}
                    className="border p-1 w-full"
                />
            </div>

            <button
                onClick={calcular}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Calcular produção ótima
            </button>

            {resultado && (
                <div className="mt-6">
                    <h2 className="font-semibold text-lg">Resultado:</h2>
                    <p><strong>Modelo A:</strong> {resultado.modeloA ?? 0}</p>
                    <p><strong>Modelo B:</strong> {resultado.result!.modeloB ?? 0}</p>
                    <p><strong>Modelo C:</strong> {resultado.modeloC ?? 0}</p>
                    <p><strong>Lucro máximo:</strong> ${resultado.result!.result}</p>
                </div>
            )}
        </div>
    );
}
