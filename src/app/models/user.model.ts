export class User {
    constructor(
        public username: string,
        public email: string,
        public password: string,
        public weight?: number,
        public height?: number,
        public gender?: string,
        public uid?: string,
        public age?: number,
        public activity?: string
    ) {}
}