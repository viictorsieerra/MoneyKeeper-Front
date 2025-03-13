export default class ReciboDTO {
    constructor(
        public _nombreRecibo?: string,
        public _idUsuario?: number,
        public _idCuenta?: number,
        public _dineroRecibo?: number,
        public _activa?: boolean,
        public _fecRecibo?: Date
    ) {}
}