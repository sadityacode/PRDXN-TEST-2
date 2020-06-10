'use strict';

window.onload = function () {

	var page_class = this.document.querySelector(".container");

	if (page_class.classList.contains("loginPage")) {
		console.log("hii");

		var signUpButton = this.document.querySelector(".sign-up-modal");
		var signInButton = this.document.querySelector(".sign-in-modal");
		var modal = document.querySelector(".modal");
		var formDivision = this.document.querySelector(".form-modal");
		var closeModalButton = this.document.querySelector('.close');
		var switchFormArray = this.Array.from(this.document.querySelectorAll('.pannel-background a'))
		var signUpFieldsArray = this.Array.from(this.document.querySelectorAll('.sign-up-form input'));
		var signInFieldsArray = this.Array.from(this.document.querySelectorAll('.sign-in-form input'));
		var submitForm = this.Array.from(this.document.querySelectorAll(".form-controls a"));

		var staticData = {
			username: 'addi',
			email: 'testresult@prdxn.com',
			password: 'success123@prdxn',
			userLogin: true,
			welcomeUser: true,
			uniqueId: 'eplUser1000'
		}

		window.localStorage.setItem(staticData['uniqueId'], JSON.stringify(staticData));

		var RegexExpression = {
			username_regex: /^([a-zA-Z]){2,10}$/,
			email_regex: /^([0-9a-zA-Z\_\.\-]+)@([0-9a-zA-Z\_\.\-]+)\.([a-zA-Z]+)$/,
			password_regex: /((?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z])){4,15}/
		}

		signUpButton.addEventListener("click", function () { displayModal(this); });
		signInButton.addEventListener("click", function () { displayModal(this); });

		function displayModal(element) {
			modal.classList.add('block');
			formDivision.classList.add('block');
			if (element.classList.contains('sign-in-modal')) {
				formDivision.classList.add('active');
			}
		}

		closeModalButton.addEventListener('click', closeModal);

		function closeModal() {
			modal.classList.remove('block');
			formDivision.classList.remove('block', 'active');
		}

		switchFormArray.forEach(function (element) {
			element.addEventListener('click', function () {
				if (this.id === "sign-in-form") {
					formDivision.classList.add('active');
				} else {
					formDivision.classList.remove('active');
				}
			})
		});

		// function form validate sign up input fields
		signUpFieldsArray.forEach(function (element) {
			element.addEventListener('keyup', function () {
				var regexForThis = RegexExpression[element.getAttribute('data-regex')];
				validate(regexForThis, this);
			});
		});

		// function for sign in form validation
		signInFieldsArray.forEach(function (element) {
			element.addEventListener("keyup", function () {
				element.parentElement.classList = "form-group";
			})
		});

		// function for form validate the regex
		function validate(RegularExpression, input) {
			var parent = input.parentNode;
			if (input.value == "") {
				parent.classList = "form-group";
			}
			else if (RegularExpression.test(input.value)) {
				parent.classList = "form-group success"
			} else {
				parent.classList = "form-group error"
			}
		}

		submitForm.forEach(function (element) {
			element.addEventListener('click', function () {
				if (element.classList.contains('sign-up')) {
					storeData();
				} else if (element.classList.contains('sign-in')) {
					varifyData();
				}
			})
		});

		// function for storing the data
		function storeData() {
			debugger;

			var allFieldsCorrect = null;
			var newEmail = document.querySelector('.sign-up-email');

			for (var i = 0; i < signUpFieldsArray.length; i++) {
				var parent = signUpFieldsArray[i].parentNode;
				if (parent.classList.contains('error') || parent.classList == 'form-group') {

					allFieldsCorrect = false;

					signUpFieldsArray.forEach(function (element) {
						if (element.value === "") { element.parentNode.classList.add('error'); }
					});

					break;
				} else { allFieldsCorrect = true; }
			}

			// checking the email-id already registered or not
			var UserAlreadyExist = checkUser(newEmail);

			if (allFieldsCorrect && !UserAlreadyExist) {
				var Data = {};
				signUpFieldsArray.forEach(function (element) {
					Data[element.getAttribute('data-regex').split('_')[0]] = element.value;
				});

				var uniqueId = "eplUser" + window.localStorage.length;
				Data['uniqueId'] = uniqueId;
				Data['userLogin'] = true;
				Data['welcomeUser'] = true;

				var data_serialized = JSON.stringify(Data);

				window.localStorage.setItem(uniqueId, data_serialized);

				formReset();
				window.location.assign("home.html?userid=" + uniqueId);
			} else { newEmail.parentElement.classList = "form-group error" }
		}

		// function for verify Data
		function varifyData() {
			var Email = document.querySelector('.sign-in-email');

			var UserAlreadyExist = checkUser(Email);

			if (UserAlreadyExist) {
				var password = document.querySelector('.sign-in-password').value;

				if (UserAlreadyExist['password'] === password) {
					formReset();
					debugger;

					UserAlreadyExist['userLogin'] = true;
					UserAlreadyExist['welcomeUser'] = true;
					window.localStorage.setItem(UserAlreadyExist['uniqueId'], JSON.stringify(UserAlreadyExist));


					window.location.assign("home.html?userid=" + UserAlreadyExist['uniqueId']);
				} else { password.parentNode.classList.add('error'); }
			} else { Email.parentNode.classList.add('error'); }
		}

		// function for checking the user-is exist or not
		function checkUser(Email) {
			debugger;
			if (localStorage.length !== 0) {
				for (var key in localStorage) {
					if (key === "length") { break; }
					else if (key.includes("eplUser")) {
						var parseData = JSON.parse(localStorage[key]);

						if (Email.value === parseData.email) {
							return parseData;
						}
					}
				} return false;
			} else { return false; }
		}

		// function for resetting the form
		function formReset() {
			var forms = Array.from(document.querySelectorAll("form"));

			forms.forEach(function (element) {
				element.reset();

				var formGroups = Array.from(element.querySelectorAll(".form-group"));
				formGroups.forEach(function (element) {
					element.classList = "form-group";
				});
			});
		}
	} else {

		var header = this.document.querySelector('header');
		var ellipsis = this.document.querySelector('.ellipsis');

		window.addEventListener('scroll' , function(){
			var pageTop = window.scrollY;

			if( !header.classList.contains('active') && pageTop > 0 ){
				header.classList.add('active');
			} else if( header.classList.contains('active') && pageTop == 0 ){
				header.classList.remove('active');
			}
		});

		ellipsis.parentNode.addEventListener('click', function(){
			var socialLinks = document.querySelector('.social-links');
			socialLinks.classList.toggle('block');
		});

	}
}























