# Document Tracking API

Document Tracking API is use for CRUD functionality

## Auth
|  #  | Action |   URL   | HTTP Verb |  CRUD  |   Description   |
| :-: | :----: | :-----: | :-------: | :----: | :-------------: |
|  1  | Login  | /auth   |   POST    | Read   | User Login      |

## Users
|  #  | Action |   URL     | HTTP Verb |  CRUD  |   Description          |
| :-: | :----: | :-------: | :-------: | :----: | :--------------------: |
|  1  | Create | /user/    |   POST    | Create | Create user            |
|  2  | Read   | /user/    |   GET     | Read   | Return all users       |
|  3  | Read   | /user/:id |   GET     | Read   | Return single user     |
|  4  | Update | /user/:id |   PUT     | Update | Update single user     |
|  5  | Delete | /user/:id |   DELETE  | Delete | Delete single user     |
|  6  | Update | /user/:id |   PUT     | Update | Update user password   |

## Sections
|  #  | Action |   URL         | HTTP Verb |  CRUD  |   Description          |
| :-: | :----: | :-----------: | :-------: | :----: | :--------------------: |
|  1  | Create | /sections/    |   POST    | Create | Create section         |
|  2  | Read   | /sections/    |   GET     | Read   | Return all sections    |
|  3  | Read   | /sections/:id |   GET     | Read   | Return single section  |
|  4  | Update | /sections/:id |   PUT     | Update | Update single section  |
|  5  | Delete | /sections/:id |   DELETE  | Delete | Delete single section  |

## Divisions
|  #  | Action |   URL          | HTTP Verb |  CRUD  |   Description          |
| :-: | :----: | :------------: | :-------: | :----: | :--------------------: |
|  1  | Create | /divisions/    |   POST    | Create | Create division        |
|  2  | Read   | /divisions/    |   GET     | Read   | Return all divisions   |
|  3  | Read   | /divisions/:id |   GET     | Read   | Return single division |
|  4  | Update | /divisions/:id |   PUT     | Update | Update single division |
|  5  | Delete | /divisions/:id |   DELETE  | Delete | Delete single division |

## Documents
|  #  | Action |   URL          | HTTP Verb |  CRUD  |   Description          |
| :-: | :----: | :------------: | :-------: | :----: | :--------------------: |
|  1  | Create | /documents/    |   POST    | Create | Create document        |
|  2  | Read   | /documents/    |   GET     | Read   | Return all documents   |
|  3  | Read   | /documents/:id |   GET     | Read   | Return single document |
|  4  | Update | /documents/:id |   PUT     | Update | Update single document |
|  5  | Delete | /documents/:id |   DELETE  | Delete | Delete single document |

## Actions
|  #  | Action |   URL          | HTTP Verb |  CRUD  |   Description        |
| :-: | :----: | :------------: | :-------: | :----: | :------------------: |
|  1  | Create | /actions/      |   POST    | Create | Create action        |
|  2  | Read   | /actions/      |   GET     | Read   | Return all actions   |
|  3  | Read   | /actions/:id   |   GET     | Read   | Return single action |
|  4  | Update | /actions/:id   |   PUT     | Update | Update single action |
|  5  | Delete | /actions/:id   |   DELETE  | Delete | Delete single action |
