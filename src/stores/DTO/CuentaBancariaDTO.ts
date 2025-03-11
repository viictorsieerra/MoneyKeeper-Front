export default class UsuarioDTO{
    constructor(
        public _idCuenta?: number,
        public _idUsuario?: number,
        public _dineroCuenta?:decimal,
        public _activa?: boolean,
        public _fechaCreacion?:DateTime,
        public _nombreCuenta?: string
    ){}
}