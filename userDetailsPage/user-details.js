// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html,
//     котра має детальну інфу про поточний пост.
// user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
//     блоки з короткою іфною про post - в ряд по 5

const url = new URL(location.href);
const id = url.searchParams.get('id');

fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(value => value.json())
    .then(value => {
        let mainDiv = document.createElement('div');
        mainDiv.classList.add('mainBlock')
        document.body.appendChild(mainDiv)

        for (const item in value) {
            let userInfo = document.createElement('div');
            userInfo.classList.add('userInfo')


            if (typeof value[item] !== 'object') {

                userInfo.innerText = `${item} - ${value[item]}`


            } else {

                userInfo.innerText = `${item}:`


                for (const key in value[item]) {

                    let keyDiv = document.createElement('div');


                    if (typeof value[item][key] !== 'object') {

                        keyDiv.innerText = `${key} - ${value[item][key]}`

                    } else {
                        keyDiv.innerText = `${key}:`
                        for (const element in value[item][key]) {
                            let innerKeyDiv = document.createElement('div');

                            if (typeof value[item][key][element] !== 'object') {
                                innerKeyDiv.innerText = `${element} - ${value[item][key][element]}`
                            }
                            keyDiv.append(innerKeyDiv)
                        }
                    }
                    userInfo.append(keyDiv)
                }

            }
            mainDiv.append(userInfo)


        }
        let buttonAndText = document.createElement('div');
        buttonAndText.classList.add('btnAndTxt')
        document.body.appendChild(buttonAndText)

        let h3 = document.createElement('h3');
        h3.innerText = `Posts of current user`
        let btn = document.createElement('button')
        btn.classList.add('buttonForPosts')
        btn.innerText = `Show posts`

        buttonAndText.append(h3, btn)

        fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
            .then(value => value.json())
            .then(value => {
                let postsDiv = document.createElement('div');
                postsDiv.classList.add('postsDiv', 'none')
                document.body.appendChild(postsDiv)

                for (const post of value) {
                    let postDiv = document.createElement('div');
                    postDiv.classList.add('post')
                    postsDiv.append(postDiv)
                    let title = document.createElement('div');
                    title.classList.add('titleClass')
                    title.innerText = `${post.title}`

                    let postBTN = document.createElement('button');
                    postBTN.innerText = 'SHOW'
                    postBTN.classList.add('postButton')

                    postBTN.onclick = () => {
                       location.href = '../postDetailsPage/post-details.html?data=' + JSON.stringify(post)
                    }
                    postDiv.append(title, postBTN)

                }

                btn.onclick = () => {
                    postsDiv.classList.toggle('none')
                    if (postsDiv.className === 'postsDiv none') {
                        btn.innerText = `Show posts`
                    }
                    else if (postsDiv.className !== 'none') {
                        btn.innerText = `Hide posts`
                    }

                }


            })

    })