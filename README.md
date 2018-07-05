# Домашний проект: facegit 1/3

[Пример первой части](http://5adf00c7c96592692ff5f32e.quirky-ardinghelli-6bcd9a.netlify.com).

_Высокий старт будет компенсируется легкими дополнениями. Следующие 2 порции
задач будут гораздо проще, не волнуйтесь из-за объема 😉._

## Описание проекта

Мы разрабатываем клиент для github, где можно гулять по друзьям, друзьям друзей,
и смотреть их профили.

## Задачи. I часть

Для начала мы реализуем простой функционал авторизации, сохранения токена в
localstorage и отражения инфромации текущего пользователя. Вот структура
проекта, котороую я вам предлагаю:

```bash
├── api.js
├── components
│   ├── AppRouter
│   ├── Follower
│   ├── Followers
│   ├── Login
│   ├── PrivateRoute
│   └── UserPage
├── index.css
├── index.js
├── ducks
│   ├── auth.js
│   ├── index.js
│   └── users.js
├── sagas
│   ├── auth.js
│   ├── index.js
│   └── users.js
├── setupTests.js
├── localstorage.js
└── store.js
```

> Файл api содержит логику по работе с токеном авторизации, распологать там ключ
> нужно с помощью саги `auth`. В файле api используется библиотека axios, ее api
> очень простой, и он позволяет сохранять ключи авторизации для всех последующих
> запросов.

---

1.  Обычно все проекты начинаются с роутера, по этому надо начать написание
    компонента `AppRouter`, с `react-router-dom`.

1.  Для компоненты `AppRouter` нужно:

    - Написать роутинг, но пока разместить 2 роута для `/users/me` и `/login`
    - Используйте Redirect, а также вам понадобится компонент PrivateRoute,
      который мы уже писали.

1.  Компонент `Login`, в котором происходит сохранение токена для github

1.  Написать компонент `UserPage`, который содержит верстку аватара
    пользователя, информацию о пользователе. При монтировании нужно делать
    запрос на получение информации о пользователе. В основной верстке должен
    быть:

    - аватар пользователя,
    - login пользователя,
    - количество фаловеров пользователя

1.  Написать экшены, редьюсеры для получения данных о пользователе. При новом
    запросе пользователя, нужно удалять данные о предыдущем пользователе.

1.  Для работы с localstorage нужно проверять наличие ключа в localstorage при
    авторизации:

    ```javascript
    import { take, put, call, select } from 'redux-saga/effects'
    import { setTokenApi, clearTokenApi } from 'api'
    import { authorize, logout, getIsAuthorized } from 'ducks/auth'
    import {
      getTokenFromLocalStorage,
      setTokenToLocalStorage,
      removeTokenFromLocalStorage
    } from 'localStorage'

    function* authFlow() {
      while (true) {
        const isAuthorized = yield select(getIsAuthorized) /* boolean */
        const localStorageToken = yield call(getTokenFromLocalStorage)

        let token

        if (!isAuthorized && localStorageToken) {
          token = localStorageToken
          yield put(authorize())
        } else {
          const action = yield take(authorize)
          token = action.payload
        }

        yield call(setTokenApi, token)
        yield call(setTokenToLocalStorage, token)

        yield take(logout)

        yield call(removeTokenFromLocalStorage)
        yield call(clearTokenApi)
      }
    }
    ```

### Как начать писать проект

Когда вам нужно приступать к написанию новых проектов, начинайте написание
проекта с первой компоненты, которая выводит вам что то простое, например пустой
div. Посмотрите, какие данные и логику нужно расположить на странице, в случае с
UserPage, нужно получить данные по пользователю, значит отправить экшен о
получении данных. Так как нужно совершить запрос, вам понадобится 3 экшена,
флаги сетевых запросов, редьюсер для данных и для ошибки. После отправки экшена,
нужно убедиться что экшен действительно отправляется, это удобно делать через
redux devtools. После того как экшен отправляется, можно приступить к написанию
саги, которая обрабатывает запрос. Сага должна получать данные, и отправлять их
в редьюсер. Как только вы увидете данные в редьюсере, можно приступать к
написанию верстки данных. Следующие шаги повторяют пройденные, смотрим какие
данные нужны, какие компоненты написать, как описать получение данных из сети.

<details>
<summary>Как работает авторизация?</summary>

Авторизация в этой домашней работе происходит с помощью токена который вы
передаете в форме, на странице `login`. Авторизация работает следующим образом,
пользователь должен ввести токен, после нажатия кнопки Еnter, компонент
отправляет экшеном токен, который с помощью саги передается в модуль api. Теперь
все запросы будут содержать ключ авторизации, и гитхаб не будет ограничивать
сетевые запросы приложения, но даже с ключом там есть лимит на 5000 запросов,
так что не удивляйтесь, если вас заблокируют на 10-15 минут при очень большом
количестве запросов.

</details>

<details>
<summary>Как подключить спиннер?</summary>

Если вы хотите такой же спиннер как примере кода, то используйте следующий код:

```js
import Spinner from 'react-svg-spinner';
...
if (isFetching) {
  return <Spinner size="64px" color="fuchsia" gap={5} />;
}
```

</details>
