export default class RegistroDTO {
    constructor(
        public _idUsuario: 0,
        public _nombre: string,
        public _apellido: string,
        public _correo: string,
        public _contrasena: string,
        public _dni: string,
        public _fecNacimiento: Date
    ) {}
}