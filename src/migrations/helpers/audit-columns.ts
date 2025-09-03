import { TableColumn } from "typeorm";

// helper function to get base columns
export const baseColumns = (): TableColumn[] => [
    new TableColumn({
        name: "id",
        type: "int",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment",
    }),
    new TableColumn({
        name: "createdAt",
        type: "timestamptz",
        default: "now()",
        isNullable: false,
    }),
    new TableColumn({
        name: "updatedAt",
        type: "timestamptz",
        default: "now()",
        isNullable: false,
    }),
];
