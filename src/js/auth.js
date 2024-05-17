'use strict';

const formValidation = (formClassName, submitButtonClassName) => {
	// validation
	const inputValidation = (type, value, targetPWValue) => {
		let errorMessage = '';

		switch (type) {
			case 'email':
				if (!value.trim()) {
					errorMessage = '이메일을 입력해주세요.';
					break;
				}
				const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
				if (!emailRegex.test(value)) {
					errorMessage = '잘못된 이메일 형식입니다';
					break;
				}

				break;
			case 'password':
				if (!value.trim()) {
					errorMessage = '비밀번호를 입력해주세요.';
					break;
				}

				if (value.trim().length < 8) {
					errorMessage = '비밀번호를 8자 이상 입력해주세요.';
					break;
				}
				break;

			case 'confirmPassword':
				if (value !== targetPWValue) {
					errorMessage = '비밀번호가 일치하지 않습니다';
					break;
				}

			default:
				// 처리할 내용이 없는 경우
				break;
		}

		return errorMessage;
	};

	const renderErrMsg = (inputId, errorMessage) => {
		const errMsgElement = document.getElementById(`${inputId}Err`);
		const inputEl = document.getElementById(inputId);
		if (errorMessage) {
			inputEl.parentElement.classList.add('error');
		} else {
			inputEl.parentElement.classList.remove('error');
		}

		if (errMsgElement) {
			errMsgElement.textContent = errorMessage;
		}
	};
	const isAllInputsValid = (inputState) => {
		for (const inputId in inputState) {
			if (inputState[inputId] !== '') {
				return false;
			}
		}
		return true;
	};

	// focus out
	const wrapperEl = document.getElementsByClassName(formClassName)[0];
	const btnEl = document.querySelector('.' + submitButtonClassName);
	const inputList = wrapperEl.querySelectorAll('input');
	const inputState = {};
	inputList.forEach((input) => {
		const id = input.id;
		inputState[id] = undefined;
	});

	wrapperEl.addEventListener('focusout', (e) => {
		const currentEl = e.target;
		if (currentEl.tagName !== 'INPUT') {
			return;
		}

		const inputType = currentEl.getAttribute('data-validate');
		const inputValue = currentEl.value;
		const targetPWValue = document.getElementById(currentEl.getAttribute('data-target'))?.value;
		const errorMessage = inputValidation(inputType, inputValue, targetPWValue || undefined);
		inputState[currentEl.id] = errorMessage;
		renderErrMsg(currentEl.id, errorMessage);

		const isAllValid = isAllInputsValid(inputState);

		btnEl.disabled = !isAllValid;
	});

	wrapperEl.addEventListener('click', (e) => {
		// handle visibility button
		if (e.target.tagName === 'BUTTON') {
			const inputEl = e.target.closest('.input_wrapper').querySelector('input');
			const inputType = inputEl.getAttribute('type');

			if (inputType === 'password') {
				inputEl.setAttribute('type', 'text');
			} else if (inputType === 'text') {
				inputEl.setAttribute('type', 'password');
			}
			e.target.classList.toggle('close');
		}
		if (e.target.classList.contains('btn_visibility')) {
		}
	});

	btnEl.addEventListener('click', () => {
		// 페이지 이동
		const address = btnEl.getAttribute('data-href');
		window.location.href = address;
	});
};

formValidation('formWrapper', 'btnSubmit');
