import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  CreateDateColumn 
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { AuditableEntity } from '../../common/entities/audit-table.entity'; 

@Entity('Program-certificates')
export class ProgramCertificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  certificateCode: string;

  @ManyToOne(() => User, (user) => user.programCertificates, { onDelete: 'CASCADE' })
  user: User;
 
  @Column({ type: 'date' })
  issueDate: Date;

  @Column({ type: 'date', nullable: true })
  expiryDate?: Date;
 
}
