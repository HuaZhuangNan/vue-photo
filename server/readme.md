# express 项目模板

## 依赖

- [express](https://www.expressjs.com.cn/)
- [nodemon](https://nodemon.io/)
- [mongoose](www.mongoosejs.net/)

## mongoose查询数据无法修改

```js
Model.find({},{__v : 0},null,{lean: true},(err,data)=>{})
```
