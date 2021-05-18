# GraphQL Core

Core components for building GraphQL APIS with test driven development.


![GrapQL-Core Overview Diagram](https://user-images.githubusercontent.com/44337835/118595945-ae577a00-b7ee-11eb-9cb8-b5c50f9dc519.png)

## Stack

* `ORM`
    * [Mongoose](https://mongoosejs.com/)
* `Database`
    * [MongoDB](https://www.mongodb.com/)
* `Graphql Server`
    * [graphql-yoga](https://github.com/dotansimha/graphql-yoga)
* `JS Variant` 
    * [Vanilla JS](https://www.javascript.com/)
    
## Features

* Testing Framework/Skeleton
    * Jest
    * Custom test server client
* User Authentication
    * Registration
    * Login 
    * Oath 
    * Session/Auth management
      * Password resets
      * Email verification
      * Logout
      * Cookie/Token expiry
* Rate limiting
* Schema modularisation
  * Unify/Merge schemas at run time
* Database schema verification
  * Yup
* Modularised resolvers
* Health check resolver
* Dev, Test and prod configuration models
* Server side routes