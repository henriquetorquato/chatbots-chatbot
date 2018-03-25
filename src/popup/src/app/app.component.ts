import {
	Component,
	ViewChild,
	ElementRef,
	AfterViewInit
} from '@angular/core'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export default class AppComponent implements AfterViewInit {

	// @ViewChild('frame', { read: ElementRef })
	// private iframe: ElementRef

	// setIframeSrc = (src: string): void => {
	// 	this.iframe.nativeElement.src = src
	// }

	ngAfterViewInit(): void {
		// this.setIframeSrc(Pages.Login)
	}

}
