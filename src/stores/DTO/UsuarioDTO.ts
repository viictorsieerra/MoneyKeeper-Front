export default class UsuarioDTO{
    constructor(
        public _idUsuario?: number,
        public _nombre?: string,
        public _apellido?:string,
        public _correo?: string,
        public _contrasena?:string,
        public _dni?: string,
        public _fecNacimiento?:Date,
        public _token?: string
    ){}
}