[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)
<a href="https://www.linkedin.com/in/williamkoller/">
<img alt="Made by William Koller" src="https://img.shields.io/badge/made%20by-William Koller-%2304D361">
</a>

# :rocket: Technologies

This project was developed with the following technologies:

- [Node.js][nodejs]
- [Yarn][yarn]
- [Sequelize][sequelize]
- [JsonWebToken][jwt]

### Routers utils Middleware

```
router.get('/users', authM[nodejs]: https://nodejs.org/
', UserController.login)

router.use(authMiddleware)

router.get('/users/:user_id/address', AddressController.index)
router.post('/users/:user_id/address', AddressController.store)
router.delete('/users/:id/address', AddressController.delete)
router.put('/users/:id/address', AddressController.update)
```

### Utils middleware w/ JWT

```
 const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).send({ error: 'No token provider' })
  }
  const parts = authHeader.split(' ')
  if (!parts.length == 2) {
    return res.status(401).send({ error: 'Token error!' })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malFormatted' })
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalid' })

    req.userId = decoded.id
    console.log(`userId => ${decoded.id}`)

    return next()
  })
```

### participants:

| name                                                         | email               |
| ------------------------------------------------------------ | ------------------- |
| [William Koller](https://www.linkedin.com/in/williamkoller/) | wkoller25@gmail.com |  |

## Developers/Contributors :octocat:

| [<img src="https://avatars2.githubusercontent.com/u/37092943?s=400&u=aeb659355263c064e78242debb0bd6de5266bbdf&v=4" width=115><br><sub>William Koller</sub>](https://github.com/williamkoller) |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |


Made with ♥ by William Koller :wave: [Get in touch!](https://www.linkedin.com/in/williamkoller/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[sequelize]: https://sequelize.org/
[jwt]: https://jwt.io/
