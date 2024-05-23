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

	const initInputState = (inputList) => {
		return Array.from(inputList).reduce((inputState, input) => {
			inputState[input.id] = null;
			return inputState;
		}, {});
	};

	const inputState = initInputState(wrapperEl.querySelectorAll('input'));

	// validation
	const inputValidation = (type, value, targetPWValue) => {
		switch (type) {
			case 'email':
				if (!value.trim()) {
					return '이메일을 입력해주세요.';
				}
				const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
				if (!emailRegex.test(value)) {
					return '잘못된 이메일 형식입니다';
				}
				break;

			case 'confirmPassword':
				if (value !== targetPWValue) {
					return '비밀번호가 일치하지 않습니다';
				}

			case 'password':
				if (!value.trim()) {
					return '비밀번호를 입력해주세요.';
				}

				if (value.trim().length < 8) {
					return '비밀번호를 8자 이상 입력해주세요.';
				}
				break;
		}
		return '';
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
	const areAllInputsValid = (inputState) => {
		return Object.values(inputState).every((error) => !error);
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
		const currentId = currentEl.id;

		// confirm type일 때 원본 값 가져오기
		const targetPWValue = inputType.includes('confirm') ? document.getElementById(currentId.replace('Check', ''))?.value : '';

		const errorMessage = inputValidation(inputType, inputValue, targetPWValue);
		inputState[currentEl.id] = errorMessage;
		renderErrMsg(currentEl.id, errorMessage);

		btnEl.disabled = !areAllInputsValid(inputState);

		console.log(areAllInputsValid(inputState));
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
