const requestURL = 'https://jsonplaceholder.typicode.com/users'; //делаем запрос на url(здесь сайт с примером JSON)
const xhr = new XMLHttpRequest();//создаем объект xhr через конструктор глобального класса XMLHttpRequest
xhr.open('get', requestURL);//создаем запрос,указывая метод и URL
xhr.onload = () =>{
   if(xhr.status >=400){//проверка статуса запроса
   console.error(xhr.response)}//Xhr.response-тело ответа сервера  
      else{   
   console.log(JSON.parse(xhr.response))}//по сети все данные передаются в формате string, поэтому необходимо применить JSON.parse или прописать xhr.responseType = 'json'
};
xhr.onerror = () =>{
   console.log(xhr.response)
   
};//обработка ошибок,например,ошибка в url
xhr.send();//отправляем запрос

//Перепишем все через promise
function sendRequest(method, url, body = null){//body = null-для метода POST
   return new Promise((resolve,reject)=>{
   const xhr = new XMLHttpRequest();
xhr.open(method, url);
xhr.onload = () =>{
   if(xhr.status >=400){
   reject(xhr.response)}//reject при ошибке  
      else{   
   resolve(JSON.parse(xhr.response))}//resolve в случае успеха
};
xhr.onerror = () =>{
   reject(xhr.response)
};

xhr.setRequestHeader('Content-Type', 'application/json')//настройки заголовков запроса. указываем,что отправляем body в формате JSON, а не просто текст


//xhr.send();
xhr.send(JSON.stringify(body));//отправляем тело запроса для метода POST. Отправляем не объект,а строку, преобразуем JSON.stringify 
})
};
/*sendRequest('get', requestURL)//отправляем запрос,указывая аргументы функции.
   .then(data=>console.log(data))//т.к. промис
   .catch(err=>console.log(err))//действие в случае ошибки*/

const body = {//тело запроса при методе POST
   name: 'Ivan',
   age: 29,
}
   sendRequest('post', requestURL, body)//отправляем запрос,указывая аргументы функции,body-ранее созданный объект
   .then(data=>console.log(data))//т.к. промис
   .catch(err=>console.log(err))//действие в случае ошибки