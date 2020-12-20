export class UserAuthentication {

    constructor(
        public authData: string){
    }

    get AuthData(){
        return this.authData;
    }
}