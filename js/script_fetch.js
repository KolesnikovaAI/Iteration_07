//с помощью fetch делаем запрос и получаем массив стран
const list = fetch('https://api.sampleapis.com/countries/countries');
console.log(list);//моментально получаем специальный объект Promise
const listPromise = fetch('https://api.sampleapis.com/countries/countries');
//listPromise.then(data => console.log(data));спустя время выводит объект Response с его описанием
listPromise
   .then(data => data.json())
   .then(countries => console.log(countries))//вывод массива объектов
   .catch(err => console.log('Ошибка', err));





//Массив членов семьи и получаем с сервера доп информацию о любимом кофе
const family = [//создаем массив объектов членов семьи
   { member: 'mother', id: 111, coffee: 'Latte' },
   { member: 'father', id: 222, coffee: 'Espresso' },
   { member: 'son', id: 333, coffee: 'Cappucino' },
]
//найти и вернуть члена семьи по его id
const getFamilyMember = (id) => {
   return new Promise((resolve, reject) => {  //возвращаем промис, т.к. обращаемся к бд, ответ будет получен не сразу
      setTimeout(() => {
         const member = family.find(res => res.id === id);//метод массива find:если true-возвращает элемент
         if (member) {
            resolve(member)//если true-передать элемент,else-ошибка
         } else {
            reject(Error('Член семьи не найден'))
         }
      }, 1500)
   })
}

const getCoffee = (member) => {//функция, при указании члена семьи
   const cofeePromise = fetch('https://api.sampleapis.com/coffee/hot');//запрос к бд с информацией о кофе
   return cofeePromise//обрабатываем промис
      .then(data => data.json())//указываем,что данные в формате json
      .then(list => {
         //console.log('Список кофе',list);список всех видов кофе
         const coffee = list.find(res => res.title === member.coffee);
         //проходим поиском по массиву кофе list res.title-наименование кофе в списке, member.coffee-сво-во кофе для члена семьи
         console.log(coffee);

      })
}

//getFamilyMember(000);//вызываем функцию,указывая id
getFamilyMember(111)
   .then(data => {
      console.log(data)//выводим объект-член семьи с id 111
      getCoffee(data)//вызываем функцию для члена семьи с id 111
   });






//Получить инфо о пользователе github 
// const myGit = fetch('https://api.github.com/users/VasilyMur');
// console.log(myGit);//в консоли-промис
// fetch('https://api.github.com/users/VasilyMur')
// .then(response=>response.json())
// .then(response=>{
//    console.log(response)
// });
//Перепишем с async await
async function getGitData() {//обозначаем,что функция асинхронная
   try {//для обработки ошибок использовать конструкцию try...catch
      const response = await fetch('https://api.github.com/users/VasilyMur');//каждый запрос ставим на паузу и ждем ответа
      const data = await response.json();//после того как данные приходят записываются в переменную
      console.log(data)
   } catch (err) {
      console.log('Ошибка', err)
   }
}
getGitData();






//Вывод функции с задержкой
function sleep(time) {
   return new Promise((resolve, reject) => {
      setTimeout(() => resolve(`Поспал ${time}`), time);
      if (time < 500) {
         reject('Слишком мало сна')
      }
   })
}
// sleep(1500)
//    .then(res => {
//       console.log(res);
//       return sleep(1000);
//    }).then(res => {
//       console.log(res);
//       return sleep(500);
//    }).then(res => {
//       console.log(res);
//       return sleep(200);
//    }).then(res => {
//       console.log(res);})
//    .catch(err=>console.log(err))

const sleepSession = async () => {
   try {
      const sleep1 = await sleep(1500);
      console.log(sleep1);
      const sleep2 = await sleep(1000);
      console.log(sleep2);
      const sleep3 = await sleep(500);
      console.log(sleep3);
      const sleep4 = await sleep(200);
      console.log(sleep4);
   } catch (err) {
      console.log(err)
   }
}
sleepSession();





/*Выводим от 1 до 10 через секунду каждый раз. Используя Promise. Ограничения - setTimeout и new Promise() 
мы можем вызывать только один раз для решения нашей задачи.
const a = new Promise((resolve, reject) => {
   for (i = 1; i <= 10; i++) {
      setTimeout(() => {
         resolve(i)
      }, 10000)
   };
});
a.then(i => console.log(i))


/*Сделайте функцию, которая будет генерировать случайные числа от 1 до 10. Сделайте так, чтобы сгенерированное число было 
задержкой функции setTimeout в секундах. Оберните все это в промис. Пусть промис выполнится успешно, 
если сгенерировано число от 1 до 5, и с ошибкой - если от 6 до 10.*/


function random(min, max) {
   return Math.floor((Math.random() * (max - min + 1)) + min);//генерируем рандомное число и округляем его
}
let interval = random(1, 10);//вызываем функцию с диапазоном,значение присваиваем переменной interval
console.log(interval);//выводим в консоль сгенерированное число

let randomPromise = new Promise((resolve, reject) => {
   setTimeout(() => {
      if (interval <= 5) {
         resolve(interval)
      } else {
         reject(Error)
      }

   }, interval * 1000);
})
randomPromise
   .then(res => console.log(`Сгенерированное число = ${res} и результат выведен в консоль с задержкой ${res} секунды`))
   .catch(err => console.log('Время ожидания более 5 сек'));




/*Сделайте цепочку из трех промисов. Пусть первый промис возвращает число. Сделайте так, чтобы каждый последующий промис 
через 3 секунды возводил в квадрат результат предыдущего промиса. После окончания манипуляций выведите число алертом на экран.*/
let num = new Promise((resolve, reject) => {
   resolve(4)
})
//цепочка промисов без задержки
// num
// .then(res=>{
//    console.log(res);
//    return res*res
// })
// .then(res=>{
//    console.log(res);
//    return res*res
// })
// .then(res=>{
//    console.log(res);
// })
//цепочка промисов с задержкой
num
   .then(res => {
      console.log(res);
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve(res * res)
         }, 3000)
      }
      )
   })
   .then(res => {
      console.log(res);
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve(res * res)
         }, 3000)
      }
      )
   }).then(res => {
      console.log(res);

   })