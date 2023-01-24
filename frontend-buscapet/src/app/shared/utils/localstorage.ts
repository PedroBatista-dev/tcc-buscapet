export class LocalStorageUtils {

    public salvarDadosLocaisUsuario(response: any, remember: string) {
        this.salvarTokenUsuario(response.token);
        this.salvarUsuario(response.user.name);
        this.salvarIsOng(response.user.isOng);
        this.salvarRemember(remember);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('buscapet.token');
        localStorage.removeItem('buscapet.user');
        localStorage.removeItem('buscapet.remember');
        localStorage.removeItem('buscapet.isOng');
    }

    public obterUsuario() {
        return localStorage.getItem('buscapet.user');
    }

    public obterIsOng() {
        return localStorage.getItem('buscapet.isOng');
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

    public salvarUsuario(name: string) {
        localStorage.setItem('buscapet.user', name);
    }

    public salvarIsOng(isOng: string) {
        localStorage.setItem('buscapet.isOng', isOng);
    }

    public salvarRemember(remember: string) {
        localStorage.setItem('buscapet.remember', remember);
    }

}
