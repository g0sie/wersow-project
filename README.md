# wersow-project

## Links

- the website: https://wersow.netlify.app/
- api: https://wersow-api.herokuapp.com/

## Custom commands

- **[to fix]** Update database with new Wersow's videos that aren't already in the database

```
python manage.py loadvideos
```

- Change today's video to another random Wersow's video

```
python manage.py changetodaysvideo
```

## API

### users/

#### register

- POST https://wersow-api.herokuapp.com/users/register

  - register a new user from a given json object with fields: name, email and password

#### login

- POST https://wersow-api.herokuapp.com/users/login

  - log in a user from a given json object with fields: email, password
  - if email and password are correct it gives a response with a jwt token

#### authenticated user

- GET https://wersow-api.herokuapp.com/users/user

  - get a response with an authenticated user

#### logout

- POST https://wersow-api.herokuapp.com/users/logout
  - log out an authenticated user

## sources

- The design is inspired by a game Chicken Invaders
- [Parallax Pixel Background Animation](https://youtu.be/aywzn9cf-_U)
- [Logo generator](https://logo.com/)
- [Django API Authentication using JWT Tokens](https://youtu.be/PUzgZrS_piQ)
- [React JWT Authentication](https://youtu.be/OUP-urBy1k4)
