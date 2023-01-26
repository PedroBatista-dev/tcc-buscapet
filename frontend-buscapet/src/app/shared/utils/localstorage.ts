export class LocalStorageUtils {

    public salvarDadosLocaisUsuario(response: any, remember: string) {
        this.salvarTokenUsuario(response.token);
        this.salvarUsuario(response.user.name);
        this.salvarUrlAvatar(response.user.avatar_url);
        this.salvarIdUsuario(response.user.id);
        this.salvarIsOng(response.user.isOng);
        this.salvarRemember(remember);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('buscapet.token');
        localStorage.removeItem('buscapet.user');
        localStorage.removeItem('buscapet.avatar');
        localStorage.removeItem('buscapet.id');
        localStorage.removeItem('buscapet.remember');
        localStorage.removeItem('buscapet.isOng');
    }

    public obterUsuario() {
        return localStorage.getItem('buscapet.user');
    }

    public obterUrlAvatar() {
        return localStorage.getItem('buscapet.avatar');
    }

    public obterIdUsuario() {
        return localStorage.getItem('buscapet.id');
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

    public salvarUrlAvatar(avatar: string) {
        localStorage.setItem('buscapet.avatar', avatar);
    }

    public salvarIdUsuario(id: string) {
        localStorage.setItem('buscapet.id', id);
    }

    public salvarIsOng(isOng: string) {
        localStorage.setItem('buscapet.isOng', isOng);
    }

    public salvarRemember(remember: string) {
        localStorage.setItem('buscapet.remember', remember);
    }

}
