/*EMAIL VALIDATION*/
function validateEmail(){
  const email = document.querySelector("#email");
  const error = document.querySelector(".error");
  const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
  const isValidEmail = emailReg.test(email.value)
  
	if(!isValidEmail){
  	if (email.value.length < 7) return;
    
  	error.innerHTML = "please enter a valid email address";
    error.classList.add('error--active');
    email.classList.add('error--input');
  } else {
    error.classList.remove('error--active');
    email.classList.remove('error--input');
  }
}

 function handleSubmit(event) {
  event.preventDefault();
 	const userName = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  let response;
  
  if (!userName || !email) {
  	response = { error: "Both Fields are required" };
  	handleError(response);
  } else if (userExists(userName)) {
  	response = { error: "username unavailable" };
  	handleError(response);
  } else {
  	addUser(userName, email, handleResponse);
  }
 }
 
 function handleResponse(response) {
  if (response.success) {
    handleSuccess(response);
    users.push({ ...response.user });
  } else {
    handleError(response);
  }
 }
 
 function handleSuccess(response) {
  const usersContainer = document.querySelector(".user-list-container");
 	const users = document.querySelector(".user-list");
  const userName = document.createElement('li');
  
  document.querySelector('#name').value = "";
  document.querySelector('#email').value = "";
  document.querySelector(".error").classList.add('error--hide');

  userName.innerHTML = response.user.username;
  users.appendChild(userName);
  usersContainer.classList.remove('user-list-container--hide');
  usersContainer.children[0].innerHTML = "active users";
  userName.addEventListener('click', deleteUser);
 }
 
 function handleError(response) {
  const errorContainer = document.querySelector(".error");

  errorContainer.innerHTML = response.error;
  errorContainer.classList.remove("error--hide");
  errorContainer.classList.add("error--active");
 }
 
 function deleteUser(event) {
  const user = event.target;
  const userList = document.querySelector(".user-list");
  const container = user.closest('.user-list-container');
 
  user.remove();
  if (!userList.firstChild) {
  	container.children[0].innerHTML = "no users found";
  }
 }
 
 const users = [];
 
 function userExists(userName) {
  return users.some((user) => user.username === userName);
 }
 

function addUser(username, email, callback) {
  var response,
    success = (!!Math.round(Math.random()));
  if (!success) {
    response = {
      success: success, 
      error: "Oups, something went wrong!"
    };
  } else {
    response = {
      success: success,
      user: { 
        username: username,
        email: email
      }
    };
  }

  $.ajax({
    url: '/echo/json/',
    type: "post",
    data: { json: JSON.stringify(response)},
    success:  callback
  });
}
