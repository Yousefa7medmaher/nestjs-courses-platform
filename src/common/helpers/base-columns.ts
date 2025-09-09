import { TableColumnOptions } from "typeorm";

// helper function to get base columns
export const baseColumns : TableColumnOptions[] = [
    {
        name: "id",
        type: "int",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment",
    },
    {
        name: "createdAt",
        type: "timestamptz",
        default: "now()",
        isNullable: false,
    },
    {
        name: "updatedAt",
        type: "timestamptz",
        default: "now()",
        isNullable: false,
    }
];
