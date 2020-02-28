# bauth-server
Bearer Authorization server

Create route for bearer auth and then add additional security to the token

## Checklist of tasks
- [x] - Assignment 1
- [x] - Assignment 2
  - [x] - 2 security measures
    - [x] - token expires as one hour
    - [x] - token rejected if userValid in DB set to false

## MongoDB Schema
```
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, default: 'unguessable password' },
  userValid: { type: Boolean, default: true }
```

## Token data
```
    id: this._id,
    username: this.username,
    issueTime: Date.now(),
    isValid: this.userValid,
```

### route testing
`http get :3000/users`

`http post :3000/signup username=kd email="kevindreyer@example.com" password=password`

`http -a test2:password get :3000/signin`

`http get :3000/supersecret 'Authorization:Bearer AUTH TOKEN'`

`http get :3000/supersecret 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTg2MThmZWRkYmRmMTFmODIwOWRhOSIsInVzZXJuYW1lIjoiZHR0ZXN0MSIsImlzc3VlVGltZSI6MTU4Mjg1MDQ0Nzg0MSwic2VjcmV0RGF0YSI6ImNoZWVzZSIsImV4cCI6MTU4Mjg1NDA0NywiaWF0IjoxNTgyODUwNDQ3fQ.0B0da8YXK2xXgobWcZjyLeVqhjDoYsnXw59HJ84xhWM'`

`http get :3000/supersecret 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTg2OTczYTI2OWQzMTJjYmQ4M2ZkYSIsInVzZXJuYW1lIjoidGVzdDIiLCJpc3N1ZVRpbWUiOjE1ODI4NjA0MTcxNjQsInNlY3JldERhdGEiOiJjaGVlc2UiLCJleHAiOjE1ODI4NjQwMTcsImlhdCI6MTU4Mjg2MDQxN30.pcAkni8GGPwgcz0h1a9tmz0q05QUFoFfu98JvVreAsI'`

