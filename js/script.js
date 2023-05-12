import movies from './db.js'
let ads = document.querySelectorAll('.promo__adv img')
ads.forEach(el => el.style.visibility = 'hidden')
let promo__interactive_list = document.querySelector('.promo__interactive-list')
let promo__genre = document.querySelector('.promo__genre')
let promo__bg = document.querySelector('.promo__bg')
let promo__title = document.querySelector('.promo__title')
let promo__descr = document.querySelector('.promo__descr')
let promo__imdb = document.querySelector('.promo__ratings').firstElementChild
let promo__movie_search = document.querySelector('.promo__ratings').lastElementChild
let menu_promo = document.querySelector('.promo__menu-list ul')
let genres = ['Top']



function reload(data, place) {
    place.innerHTML = ''
    data = data.sort((a, b) => a.Title > b.Title ? 1 : -1)
    bg_set(data[0])

    for (let item of data) {
        if (!genres.includes(item.Genre)) {
            genres.push(item.Genre)
        }
        let promo__interactive_item = document.createElement('div')
        let delete_btn = document.createElement('div')
        promo__interactive_item.classList.add('promo__interactive-item')
        delete_btn.classList.add('delete')
        promo__interactive_item.innerHTML = `${data.indexOf(item) + 1}) ${item.Title}`
        promo__interactive_item.append(delete_btn)
        promo__interactive_list.append(promo__interactive_item)
        delete_btn.onclick = () => {
            data = data.filter(el => el.Title !== item.Title)
            reload(data, promo__interactive_list)
        }
        promo__interactive_item.onclick = () => {
            bg_set(item)
        }
    }
}
function bg_set(item) {
    promo__bg.style.background = `url(${item.Poster})`
    promo__genre.innerHTML = item.Genre
    promo__title.innerHTML = item.Title
    promo__descr.innerHTML = item.Plot
    promo__imdb.innerHTML = `IMDb: ${item.imdbRating}`
    promo__movie_search.innerHTML = `Кинопоиск: ${item.Metascore}`
}
reload(movies, promo__interactive_list)

function category(date, place) {
    place.innerHTML = ''
    for (let item of date ) {
        let ul = document.createElement('ul')
        ul.classList.add('promo__menu-item')
        ul.innerHTML = item

        ul.onclick = () => {
            every_li.forEach(el => el.classList.remove('promo__menu-item_active'))
            ul.classList.add('promo__menu-item_active')
            let filtered = movies.filter(el => el.Genre === item)
            if (item === 'Top') {
                reload(movies, promo__interactive_list)
            } else {
                reload(filtered, promo__interactive_list)
            }
        }

        place.append(ul)
    }
    let every_li = place.querySelectorAll('ul')
}
category(genres, menu_promo)