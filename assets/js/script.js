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
	}
}























