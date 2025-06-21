export const formDefaultData = {
    lucro: [4, 2, 3],
    maoDeObra: [7, 3, 6],
    material: [4, 4, 5],
    limiteMaoDeObra: 150,
    limiteMaterial: 200,
}

export const calculadoraModels = ['Modelo A', 'Modelo B', 'Modelo C'];

export type Modelo =  {
    name: string
    key: string
    value: number
    color: string
    bgColor: string
    textColor: string
};
