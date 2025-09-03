// src/database/migrations/helpers/audit-columns.ts
import { TableColumn } from 'typeorm';

export class AuditColumns {
  static get(): TableColumn[] {
    return [
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp with time zone',
        default: 'NOW()',
      }),
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp with time zone',
        default: 'NOW()',
      })
    ];
  }
}
