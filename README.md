# wersow-project

## links

- the website: https://wersow.netlify.app/
- api: https://wersow-api.herokuapp.com/

## custom commands

- **[to fix]** Update database with new Wersow's videos that aren't already in the database

```
python manage.py loadvideos
```

- Change today's video to another random Wersow's video

```
python manage.py changetodaysvideo
```

## api

### users

- POST https://wersow-api.herokuapp.com/users/register

  - register a new user from a given json object with fields: name, email and password

- POST https://wersow-api.herokuapp.com/users/login

  - login a user from a given json object with fields: email, password
  - if email and password are correct it gives a response with a jwt token

- GET https://wersow-api.herokuapp.com/users/user

  - it gives a response with an authenticated user

- POST https://wersow-api.herokuapp.com/users/logout
  - logout an authenticated user
