const Koa = require('koa')
const app = new Koa()

app.use((ctx,next) => {
    console.log('第一层中间件...1');
    ctx.response.body = 'hello world'
    next()
    console.log('第一层中间件...2');
})

app.use(async(ctx,next) => {
    console.log('第二层中间件...1');
    const res = await next()
    console.log(res);
    console.log('第二层中间件...2');
})

app.use((ctx,next) => {
    console.log('第三层中间件');
    return 'i love the dog'
})
app.listen(3000)