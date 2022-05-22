(function () {
    const indexContainer = document.querySelector('.articles__container');  
    const articlesOnPage = 20;
    
    // ПОЛУЧЕНИЕ ДАННЫХ ДЛЯ СОЗДАНИЯ СПИСКА СТАТЕЙ, ПАГИНАЦИИ
    async function getArticleList() {
        let paramsString = document.location.search; 
        let searchParams = new URLSearchParams(paramsString);
        let url = `https://gorest.co.in/public-api/posts?${searchParams}`;

        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json' }    
        });
        const data = await response.json();
        console.log(data);
        
        return data;
    }
    
    // ЗАГРУЗКА СТРАНИЦЫ
    getArticleList()
        .then((data) => {
            createBlogTitle();
            createArticleList(data.data, data.meta);
            createPagination(data);
        });

    // СОЗДАНИЕ ОСНОВНОГО ЗАГОЛОВКА
    async function createBlogTitle() {
        const mainTitle = document.createElement('h1');
        mainTitle.classList.add('articles__title');
        mainTitle.textContent = 'Blog. List of articles';

        indexContainer.append(mainTitle);
    }

    // СОЗДАНИЕ СПИСКА СТАТЕЙ
    async function createArticleList(arr, meta) {
        const articlesList = document.createElement('ul');
        articlesList.classList.add('article__list', 'list-group');

        for (let i = 0; i < arr.length; i++) {
            const articleItem = document.createElement('li');
            const articleLink = document.createElement('a');

            articleItem.classList.add('articles__item', 'list-group-item', 'list-group-item-primary', 'list-group-item-action');
            articleLink.classList.add('articles__link', 'link-dark');

            let articleLinkId = arr[i].id
            articleLink.setAttribute('href', `post.html?id=${articleLinkId}`);
            // формула расчета номера статьи
            let j = i + 1;
            let page = meta.pagination.page;
            let articleNumber = j + (page - 1) * articlesOnPage;
            articleLink.textContent = articleNumber + '.'  + ' ' + arr[i].title;

            articleItem.append(articleLink);
            articlesList.append(articleItem);

        }
        indexContainer.append(articlesList);
    }

    // СОЗДАНИЕ ПАГИНАЦИИ
    async function createPagination(data) {
        const navigation = document.createElement('nav');
        const paginationList = document.createElement('ul');
        paginationList.classList.add('pagination__list', 'list-group-horizontal', 'pagination');

        navigation.setAttribute('aria-label', 'Навигация по страницам блога');

        for (let i = 1; i <= data.meta.pagination.pages; i++) {
            const paginationItem = document.createElement('li');
            const paginationBtn = document.createElement('a');

            if (i === 1) {
                paginationBtn.setAttribute('href', `index.html`);
            } else {
                paginationBtn.setAttribute('href', `index.html?page=${i}`);
            }
            
            paginationItem.classList.add('pagination__item', 'page-item');
            paginationBtn.classList.add('pagination__btn', 'page-link');
            paginationBtn.textContent = i;
        
            paginationItem.append(paginationBtn);
            paginationList.append(paginationItem);  
            
            paginationItem.addEventListener('click', function () {
                currentPage = i;
                paginationItem.classList.add('active');
            })
        }

        navigation.append(paginationList);
        indexContainer.append(navigation);
    }

})();