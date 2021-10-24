import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Unique, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({ name: 'user' })
@Unique([ 'email' ])
export class UserEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column({ nullable: false })
	name: string;

	@Column({ nullable: false })
	email: string;

	@Column({ nullable: false })
	password: string;

	@Column({ default: true })
	activated: boolean;

	@ManyToMany(() => RoleEntity, { nullable: false })
	@JoinTable()
	roles: RoleEntity[];
	@CreateDateColumn() created_at: Date;
	@UpdateDateColumn() updated_at: Date;
}
