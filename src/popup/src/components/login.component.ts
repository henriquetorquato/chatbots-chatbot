import {
	Component,
	ViewChild,
	ElementRef
} from '@angular/core'

import Token from '../models/token.model'

@Component({
	selector: 'app-login',
	templateUrl: './templates/login.template.html',
	styleUrls: [
		'./styles/login.style.css'
	]
})
export default class LoginComponent {

	@ViewChild('login', { read: ElementRef })
	private loginInput: ElementRef

	@ViewChild('password', { read: ElementRef })
	private passwordInput: ElementRef

	attemptLogin = () => {

		const userLogin = this.loginInput.nativeElement.value
		const password = this.passwordInput.nativeElement.value

		const token = new Token(userLogin, password)
		token.get(response => { })

	}

}
