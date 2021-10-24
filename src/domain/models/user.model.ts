import { RoleModel } from "./role.model";

export class UserModel {
	constructor(user: UserModel) {
		this.id = user.id;
		this.name = user.name;
		this.email = user.email;
		this.password = user.password;
		this.activated = user.activated;
		this.roles = user.roles;
		this.created_at = user.created_at;
		this.updated_at = user.updated_at
	}
	id?: number;
	name: string;
	email: string;
	password: string;
	activated?: boolean;
	roles: RoleModel[] ;
	created_at?: Date;
	updated_at?: Date;
	
}
