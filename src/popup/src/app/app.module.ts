import {
	MatInputModule,
	MatButtonModule
} from '@angular/material'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import Login from '../components/login.component'
import AppComponent from './app.component'

@NgModule({
	declarations: [
		AppComponent,
		Login
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatInputModule,
		MatButtonModule
	],
	providers: [],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
