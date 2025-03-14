export default class TransaccionDTO {
    constructor(
        public _idTransaccion?: number,
        public _idUsuario?: number,
        public _idCategoria?: number,
        public _idCuenta?: number,
        public _cantidad?: number,
        public _tipoMovimiento?: string,
        public _descripcionTransaccion?: string,
        public _fecTransaccion?: Date
    ) {}
}