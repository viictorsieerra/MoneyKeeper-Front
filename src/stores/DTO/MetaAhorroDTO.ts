export default class MetaAhorroDTO {
    constructor(
        public _idMeta?: number,
        public _idUsuario?: number,
        public _nombreMeta?: string,
        public _descripcionMeta?: string,
        public _dineroObjetivo?: number,
        public _dineroActual?: number,
        public _activoMeta?: true,
        public _fechaCreacionMeta?: Date,
        public _fechaObjetivoMeta?: Date
    ) {}
}