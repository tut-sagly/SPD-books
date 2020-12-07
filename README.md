BOOKS
==============

Quick Start 
-----------

Using Docker Compose for development:
1. run `docker-compose -f docker-compose-dev.yml up`.
 
Deploy
-----------
1. Define .env (see .env.sample [.env.sample](.env.sample))
2. Run `heroku container:push web`
3. Run `heroku container:release web`
[More Details here](https://devcenter.heroku.com/articles/local-development-with-docker-compose)

Not implemented but must have in the real app
-----------
1. Logging
2. Handle 404 page and 500+ HTTP status codes 
3. Form validations
4. Tests ^_^
5. Properly pagination during the search on the Books page (pagination hides to do not confuse user now)

