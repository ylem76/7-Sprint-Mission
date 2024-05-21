'use strict';

/**
 *
 * 폼과 버튼 클래스 이름을 이용해 formValidation 함수 실행
 * 폼 내부의 input리스트를 가져와 inputState 생성 -> 이 객체를 이용해 폼 전체의 인풋이 조건을 충족하는지 확인
 * focusout했을 때 해당 input validation 실행 -> 오류 등을 inputState업데이트 -> 전체 인풋 validation체크
 *
 */

const formValidation = (formClassName, submitButtonClassName) => {
	// elements
	const wrapperEl = document.querySelector('.' + formClassName);
	const btnEl = document.querySelector('.' + submitButtonClassName);
	const inputList = wrapperEl.querySelectorAll('input');

	// init inputState
	const initInputState = (inputList) => {
		const inputState = {};
		inputList.forEach((input) => {
			const id = input.id;
			inputState[id] = undefined;
		});
		return inputState;
	};
	const inputState = initInputState(inputList);

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
				break;
		}

		return errorMessage;
	};

	// render error message
	const renderErrMsg = (inputId, errorMessage) => {
		const errMsgElement = document.getElementById(`${inputId}Err`);
		const inputEl = document.getElementById(inputId);

		// error class toggle
		if (errorMessage) {
			inputEl.parentElement.classList.add('error');
		} else {
			inputEl.parentElement.classList.remove('error');
		}

		// error message change
		if (errMsgElement) {
			errMsgElement.textContent = errorMessage;
		}
	};

	// all input valid check
	const isAllInputsValid = (inputState) => {
		for (const inputId in inputState) {
			if (inputState[inputId] !== '') {
				return false;
			}
		}
		return true;
	};

	// handlers
	const handleInputFocusout = (e) => {
		// validation
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
	};

	const handlePWVisibility = (e) => {
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
	};

	const handleSubmitClick = () => {
		// page move
		const address = btnEl.getAttribute('data-href');
		window.location.href = address;
	};

	wrapperEl.addEventListener('focusout', handleInputFocusout);
	wrapperEl.addEventListener('click', handlePWVisibility);
	btnEl.addEventListener('click', handleSubmitClick);
};

formValidation('formWrapper', 'btnSubmit');
