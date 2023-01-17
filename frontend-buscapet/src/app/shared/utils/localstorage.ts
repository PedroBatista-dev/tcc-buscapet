import { User } from "src/app/pages/users/shared/user.model";

export class LocalStorageUtils {

    public obterUsuario() {
        return JSON.parse(localStorage.getItem('buscapet.user')!);
    }

    public salvarDadosLocaisUsuario(response: any, remember: string) {
        this.salvarTokenUsuario(response.token);
        this.salvarUsuario(response.user);
        this.salvarRemember(remember);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('buscapet.token');
        localStorage.removeItem('buscapet.user');
        localStorage.removeItem('buscapet.remember');
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('buscapet.token')!;
    }

    public obterRemember(): string {
        return localStorage.getItem('buscapet.remember')!;
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('buscapet.token', token);
    }

    public salvarUsuario(user: User) {
        localStorage.setItem('buscapet.user', JSON.stringify(user));
    }

    public salvarRemember(remember: string) {
        localStorage.setItem('buscapet.remember', remember);
    }

}
