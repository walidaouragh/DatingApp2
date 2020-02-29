import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { User } from 'src/app/_models/user';

@Component({
	selector: 'app-edit-roles-modal',
	templateUrl: './edit-roles-modal.component.html',
	styleUrls: ['./edit-roles-modal.component.css']
})
export class EditRolesModalComponent implements OnInit {
	@Output() updateSelectedRoles = new EventEmitter();
	user: User;
	roles: any[];

	constructor(public bsModalRef: BsModalRef) {}

	ngOnInit() {}

	updateRoles() {
		this.updateSelectedRoles.emit(this.roles);
		this.bsModalRef.hide();
	}
}
