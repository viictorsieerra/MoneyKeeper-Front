export default class PresupuestoDTO {
    constructor(
        public _idPresupuesto?: number,
        public _idUsuario?: number,
        public _idCategoria?: number,
        public _nombrePresupuesto?: string,
        public _limite?: number,
        public _dineroActual?: number,
        public _fecCreacion?: Date,
        public _activo?: boolean
    ) {}
}