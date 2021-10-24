import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';

@Entity({ name: 'role' })
@Unique([ 'name' ])
export class RoleEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column({ nullable: false })
	name: string;

	@CreateDateColumn() created_at: Date;

	@UpdateDateColumn() updated_at: Date;
}
