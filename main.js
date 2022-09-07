let elem = document.getElementById('text_text');         //объявляю все переменные
let progress = document.getElementById('progress_value');
let errors = document.getElementById('errors_value');
let start = document.getElementById('start');
let times = document.getElementById('time_value');

let done_count = 0;
let errors_count = 0;
let all = 0;

let characters = 0;

let timer;
let time = 60;

var check = 0;
var x;

function connect() { //функция для получения текста
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "https://baconipsum.com/api/?type=all-meat&paras=1&format=text", false);
    xhr.send();

    x = xhr.responseText;

    xhr.onload = console.log(xhr.responseText);

    elem.innerHTML = x;

    x = x.split(''); //делю весь текст на отдельные части массива для того чтобы перебирать после

    // console.log(x);
}

function keyup() { //функция для прослушивания нажатия
    document.addEventListener('keyup', press);
}

function press(e) { // функция с 3 условными конструкциями для проверки правильно нажали клавишу или нет
    if (e.key == 'Shift' || e.key == 'Alt' || e.key == 'Enter') { //проверка на данные клавиши чтобы было меньше ошибок
        console.log('Система');
    } else if (e.key == x[check]) { //проверка нажатых клавишь на соответствие тексту
        done_count++; all++; characters++;
        x.splice(0,1); //удаляю первый элемент в случае если верно нажали клавишу
        x = x.join(''); //соединяю массив в текст для обновления букв
        elem.innerHTML = x;
        x = x.split(''); //снова разделяю текст для проверки следующей клавиши
        // console.log(x);
        progress.innerHTML = Math.round((done_count/all)*100);
        errors.innerHTML = errors_count;
    } else { //в случае ошибочного ответа выполняет данную функцию
        errors_count++; all++; characters++;
        progress.innerHTML = Math.round((done_count/all)*100);
        errors.innerHTML = errors_count;
        if (errors_count > (x.length/30)) { //проверка на количество ошибок после получения последней
            let fail = confirm('Вы проиграли! Начните заного! Ваша скорость: ' + characters + ' CPM');
            if (fail) {
                location.reload();
            } else {
                location.reload();
        }
    }
}
    if (done_count == x.length) { //единственный вариант выйграть, нужно полностью написать текст с малым кол-вом ошибок
        alert('Вы выйграли! Ваша скорость: ' + characters + ' CPM');
        let win = confirm('Хотите поиграть еще?');
        if (win) {
            location.reload();
        }
    }
}

function time_count() { //функция отсчёта времени
    times.innerHTML = time;
    time--;
    if (time < 0) {
        clearTimeout(timer);
        x.length = 5;
    } else {
        timer = setTimeout(time_count, 1000);
    }
}

function start_trainer(e) { //функция запуска игры
    if (e.key == 'Enter') {
        connect();
        start.style.display = "none";
        keyup();
        time_count();
    } if (e.key != 'Enter') { //функция благодаря которой можно нажимать любые клавиши до начала игры
        location.reload();
    }
}

document.addEventListener('keydown', start_trainer, { //прослушивание начала игры, чтобы отрисовка была единожды
    once: true
})
