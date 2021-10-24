export class RoleModel {
	constructor(role: RoleModel) {
		this.id = role.id;
		this.name = role.name;
		this.created_at = role.created_at;
		this.updated_at = role.updated_at
	}
	id?: number;
	name: string;
	created_at?: Date;
	updated_at?: Date;
}
