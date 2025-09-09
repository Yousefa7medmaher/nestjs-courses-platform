import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AuditableEntity {
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;
}
