// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста
// (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
// post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
//     Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно
// що це блоки (дати фон. марджини і тд)

let url = new URL(location.href);
let data = url.searchParams.get('data');
let parse = JSON.parse(data);

let postDiv = document.createElement('div');
postDiv.classList.add('mainBox')
document.body.appendChild(postDiv)

let postInfo = document.createElement('div');
postInfo.classList.add('postInfo')
let postText = document.createElement('div');
postText.classList.add('postText')
document.body.append(postInfo, postText)

for (const item in parse) {
    if (typeof parse[item] === 'number') {
        let Info = document.createElement('div');
        Info.classList.add('Info')
        Info.innerText = `${item} --- ${parse[item]}`

        postInfo.appendChild(Info)
    } else if (item === 'title'){
        let postTitle = document.createElement('div');
        postTitle.classList.add('title')
        postTitle.innerText = `${parse[item]}`
        postText.append(postTitle)
    }
    else if (item === 'body') {
        let text = document.createElement('div');
        text.classList.add('text')
        text.innerText = `${parse[item]}`
        postText.append(text)

    }

}

postDiv.append(postInfo, postText)


fetch(`https://jsonplaceholder.typicode.com/posts/${parse.id}/comments`)
    .then(value => value.json())
    .then(value => {
        let commentsDiv = document.createElement('div');
        commentsDiv.classList.add('comments')
        document.body.appendChild(commentsDiv)

        for (let element of value) {
            let commentDiv = document.createElement('div');
            commentDiv.classList.add('comment')
            commentsDiv.append(commentDiv)

            for (const key in element) {
                if (key === 'id') {

                    fetch(`https://jsonplaceholder.typicode.com/users/${element.id}`) // я зробив щоб замість виведення поточного айді юзера,
                        // воно підбирало по цьому айді через інше посилання юзера(але там юзерів тільки 10 є тому в одинадцятом коменті і далі значення виводиться як 'undefined')
                        .then(value => value.json())
                        .then(value => {

                            let nameCommentator = document.createElement('div');
                            nameCommentator.classList.add('nameCommentator')
                            nameCommentator.innerText = `${value.name}`
                            commentDiv.prepend(nameCommentator)

                        })

                }
                else if (key === 'body' || key === 'name' ) {
                    let comment = document.createElement('div');

                    comment.innerText = `${element[key]}`

                    commentDiv.append(comment)
                }
                else {
                    let comment = document.createElement('div');

                    comment.innerText = `${key}: ${element[key]}`

                    commentDiv.append(comment)
                }
            }

        }

    })

