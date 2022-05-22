(function () {
    const postContainer = document.querySelector('.post__container');    

    // ПОЛУЧЕНИЕ ДАННЫХ ДЛЯ СОЗДАНИЯ СТАТЬИ
    async function getArticle() {
        const params = new URLSearchParams(document.location.search);
        let articlesId = params.get('id');

        const responseArticleDescr = await fetch(`https://gorest.co.in/public-api/posts/${articlesId}`)
        let articleDescr = await responseArticleDescr.json();

        const responseComments = await fetch(`https://gorest.co.in/public-api/comments?post_id=${articlesId}`)
        let comments = await responseComments.json();

        return { articleDescr, comments };
    }

    // ЗАГРУЗКА СТАТЬИ
    getArticle()
        .then((data) => {
            createArticle(data.articleDescr);
            createComment(data.comments.data);
        });
    
    // СОЗДАНИЕ СТАТЬИ
   
    async function createArticle(descr) {
        const titleOfArticle = document.createElement('h1');
        const descrOfArticle = document.createElement('p');

        titleOfArticle.classList.add('post__title', 'fs-2');
        descrOfArticle.classList.add('lh-base')

        titleOfArticle.textContent = descr.data.title;
        descrOfArticle.textContent = descr.data.body;
        
        postContainer.append(titleOfArticle);
        postContainer.append(descrOfArticle);
    }

    async function createComment(arr) {
        const commentsTitle = document.createElement('h2');
        commentsTitle.classList.add('text-secondary', 'fs-4');
        postContainer.append(commentsTitle);

        const commentsList = document.createElement('ul');
        commentsList.classList.add('post__list');

        if (arr.length > 0) {
            commentsTitle.textContent = 'Comments:';
            
        } else {
            commentsTitle.textContent = 'No comments.';
        }

        // console.log(arr.length);
        for (let i = 0; i < arr.length; i++) {
            const commentsItem = document.createElement('li');
            const commentator = document.createElement('p');
            const commentText = document.createElement('p');

            commentsItem.classList.add('list-group-item', 'comments__item');
            commentator.classList.add('text-secondary', 'comments__user');
            commentText.classList.add('text-secondary', 'comments__text');

            commentator.textContent = arr[i].name + ':';
            commentText.textContent = arr[i].body;

            commentsItem.append(commentator);
            commentsItem.append(commentText);
            commentsList.append(commentsItem);
        }

        postContainer.append(commentsList);
        
    }
    
})();