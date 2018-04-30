var config = {
    apiKey: "AIzaSyB075Pk8Zs-vLk1deutDMcGKuxkcURjidA",
    authDomain: "online-food-order-758b0.firebaseapp.com",
    databaseURL: "https://online-food-order-758b0.firebaseio.com",
    projectId: "online-food-order-758b0",
    storageBucket: "online-food-order-758b0.appspot.com",
    messagingSenderId: "908019907590"
  };
  firebase.initializeApp(config);


//reference messege collection

var messeges=firebase.database().ref('complain1');



document.getElementById('button-1').addEventListener('click', submitform);

//call this on submit
function submitform(e) {
	e.preventDefault();
//get values

var name=formvalues('first_name');
var lastname=formvalues('last_name');
var email=formvalues('email');
var complain=formvalues('textarea1');


//save messege called
savemessege(name,lastname,email,complain);

// show that the data is saved

document.querySelector('.alert').style.display='block';

//hide alert after some time

setTimeout(function(){
	document.querySelector('.alert').style.display='none';
	document.getElementById("complainform").reset();

},3000);
}



// function to get form values


function formvalues(id) {
	

return document.getElementById(id).value;



}


//save messege to firebase

function savemessege(name,lastname,email,complain) {
	var newmesseges= messeges.push();
	newmesseges.set({
		name:name,
		lastname:lastname,
		email:email,
		complain:complain
	});
}