import {DollarSign, Package, PersonStanding} from "lucide-react";

export const formDefaultData = {
    lucro: [4, 2, 3],
    maoDeObra: [7, 3, 6],
    material: [4, 4, 5],
    limiteMaoDeObra: 150,
    limiteMaterial: 200,
}

export const calculadoraModels = ['Modelo A', 'Modelo B', 'Modelo C'];

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
