import { User } from "src/app/pages/users/shared/user.model";

export class LocalStorageUtils {

    public obterUsuario() {
        return JSON.parse(localStorage.getItem('buscapet.user')!);
    }

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.token);
        this.salvarUsuario(response.user);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('buscapet.token');
        localStorage.removeItem('buscapet.user');
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('buscapet.token')!;
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('buscapet.token', token);
    }

    public salvarUsuario(user: User) {
        localStorage.setItem('buscapet.user', JSON.stringify(user));
    }

}
