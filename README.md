<div align="center">

  <h1>kinka + serializy</h1>

  [![](https://img.shields.io/badge/license-MIT-red.svg)](./LICENSE)
  [![](https://img.shields.io/npm/v/axios-serializy.svg)](https://www.npmjs.com/package/axios-serializy)
  [![](https://img.shields.io/travis/acacode/axios-serializy.svg)](https://travis-ci.org/acacode/axios-serializy)
  [![](https://www.codefactor.io/repository/github/acacode/axios-serializy/badge/master)](https://www.codefactor.io/repository/github/acacode/axios-serializy/overview/master)
  [![](https://img.shields.io/npm/dm/axios-serializy.svg)](http://npm-stat.com/charts.html?package=axios-serializy)
  [![](https://badgen.net/bundlephobia/min/axios-serializy)](https://bundlephobia.com/result?p=axios-serializy)
  [![](https://badgen.net/bundlephobia/minzip/axios-serializy)](https://bundlephobia.com/result?p=axios-serializy)

  <p>
    ⚡️ Integration <b>serializy</b> with <b>axios</b> ⚡️
  </p>
</div>

## 🚀 Installation

    $ npm i -S axios-serializy
    # or using yarn
    $ yarn add axios-serializy

<!-- ## 📚 Usage   -->

<!-- ```js
import kinka from 'kinka'
import axiosSerializy from 'axios-serializy'


const api = kinka.create({
  baseURL: 'https://your-api.com',
  middlewares: [
    axiosSerializy
  ]
})

// ...

const { data } = await api.get('/client/1234', {
  model: ClientModel
})

console.log(data) // your serialized client model
```  

Also if you want to serialize error messages from server you need to:  

```js

const api = kinka.create({
  baseURL: 'https://your-api.com',
  middlewares: [
    axiosSerializy({
      errorModel: YourPrettifiedErrorModel
    })
  ]
})

``` -->


## 📝 License

Licensed under the [MIT License](./LICENSE).
