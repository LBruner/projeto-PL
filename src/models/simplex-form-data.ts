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
    result?: number;
    folgaMaterial?: number;
    folgaMaoDeObra?: number;
};