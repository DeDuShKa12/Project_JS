// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра
// має детальну інфорацію про об'єкт на який клікнули
// index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user
const url = new URL(location.href);

fetch(`https://jsonplaceholder.typicode.com/users`)
    .then(value => value.json())
    .then(value => {
        let mainDiv = document.createElement('div');
        mainDiv.classList.add('mainDiv')
        document.body.appendChild(mainDiv)
        let div1 = document.createElement('div');
        div1.classList.add('innerDivs')


        mainDiv.append(div1)


        for (i = 0; i < value.length; i++) {
            console.log(i);
            let userDiv = document.createElement('div');
            userDiv.classList.add('userDiv')

            let infoDiv = document.createElement('div');
            infoDiv.classList.add('text')
            infoDiv.innerHTML = `${value[i].id}. <b>${value[i].name}</b>`
            userDiv.append(infoDiv)

            

            let btnUserDetails = document.createElement('button');
            btnUserDetails.classList.add('button')
            btnUserDetails.innerText = 'More information'
            const index = i
            btnUserDetails.onclick = () => {
                console.log('clicked', value[index]);
                location.href = `../userDetailsPage/user-details.html?id=${value[index].id}`
            }

            userDiv.appendChild(btnUserDetails)
            mainDiv.append(userDiv)

            div1.append(userDiv)



        }
    })