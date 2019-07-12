import api from "./api";

class App {
    constructor() {
        this.repositories = [];

        this.formEl = document.querySelector('#repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.querySelector('#repo-list');

        this.registerHandlers();
    }
    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setloading(loading = true) {
        
        if (loading === true) {
            let loadingEl = document.createElement('img');
            loadingEl.setAttribute('src','https://www.portalconcordia.com.br/imagens/carregamento_produtos_shopping.gif');
            loadingEl.setAttribute('id', 'load');

            this.formEl.appendChild(loadingEl);
        }
        else{
            document.getElementById('load').remove();
        }
    }

    async addRepository(event) {
        event.preventDefault();

        const repoInput = this.inputEl.value;
        if (repoInput.lenght === 0) {
            return;
        }
        this.setloading();

        try {
            const response = await api.get(`/repos/${repoInput}`);

            const { name, description, html_url, owner: { avatar_url } } = response.data;

            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url
            });

            this.inputEl.value = '';

            this.render();
        }
        catch (err) {
            alert('repositorio não existe');
        }

        this.setloading(false);
    }

    render() {
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEL = document.createElement('img');
            imgEL.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.setAttribute('target', '_black');
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItem = document.createElement('li');
            listItem.appendChild(imgEL);
            listItem.appendChild(titleEl);
            listItem.appendChild(descriptionEl);
            listItem.appendChild(linkEl);

            this.listEl.appendChild(listItem);

        });
    }
}

new App();