# bauth-server
Bearer Authorization server

Create route for bearer auth and then add additional security to the token


`http get :3000/users`

`http post :3000/signup username=kd email="kevindreyer@example.com" password=password`

`http -a test2:password get :3000/signin`

`http get :3000/supersecret 'Authorization:Bearer AUTH TOKEN'`

`http get :3000/supersecret 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTg2MThmZWRkYmRmMTFmODIwOWRhOSIsInVzZXJuYW1lIjoiZHR0ZXN0MSIsImlzc3VlVGltZSI6MTU4Mjg1MDQ0Nzg0MSwic2VjcmV0RGF0YSI6ImNoZWVzZSIsImV4cCI6MTU4Mjg1NDA0NywiaWF0IjoxNTgyODUwNDQ3fQ.0B0da8YXK2xXgobWcZjyLeVqhjDoYsnXw59HJ84xhWM'`

`http get :3000/supersecret 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTg2OTczYTI2OWQzMTJjYmQ4M2ZkYSIsInVzZXJuYW1lIjoidGVzdDIiLCJpc3N1ZVRpbWUiOjE1ODI4NjA0MTcxNjQsInNlY3JldERhdGEiOiJjaGVlc2UiLCJleHAiOjE1ODI4NjQwMTcsImlhdCI6MTU4Mjg2MDQxN30.pcAkni8GGPwgcz0h1a9tmz0q05QUFoFfu98JvVreAsI'`

