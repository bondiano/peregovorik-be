module.exports = () => ({
  test: {
    method: 'GET',
    path: '/',
    handlers: [
      ctx => {
        ctx.body = 'test'
      },
    ],
  },
  getUserData: {
    method: 'GET',
    path: '/:id',
    handlers: [() => {}],
  },
})
