export type SimplexFormData = {
    lucro: number[];
    maoDeObra: number[];
    material: number[];
    limiteMaoDeObra: number;
    limiteMaterial: number;
};

export type Resultado = {
    modeloA?: number;
    modeloB?: number;
    modeloC?: number;
    resultado?: number;
    folgaMaterial?: number;
    folgaMaoDeObra?: number;
};