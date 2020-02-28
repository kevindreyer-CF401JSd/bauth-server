# bauth-server
Bearer Authorization server

Create route for bearer auth and then add additional security to the token


`http get :3000/users`

`http post :3000/signup username=kd email="kevindreyer@example.com" password=password`

`http get :3000/supersecret 'Authorization:Bearer AUTH TOKEN'`