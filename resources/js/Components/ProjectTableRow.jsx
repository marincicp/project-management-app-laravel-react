import { STATUS } from "@/constants";
import { Table } from ".";
import { Link } from "@inertiajs/react";

function ProjectTableRow({ item }) {
    return (
        <Table.Row>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>
                <img width={80} src={item.image_path} alt="project img" />
            </Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>
                <span
                    className={` flex justify-center px-2 py-1 rounded text-white ${
                        STATUS[item.status]?.color
                    }`}
                >
                    {STATUS[item.status].label}
                </span>
            </Table.Cell>
            <Table.Cell>{item.created_at}</Table.Cell>
            <Table.Cell>{item.due_date}</Table.Cell>
            <Table.Cell>{item.createdBy.name}</Table.Cell>
            <Table.Cell>
                <Link
                    className="text-blue-500 hover:underline mx-1"
                    href={route("project.edit", item.id)}
                >
                    Edit
                </Link>
                <Link
                    className="text-red-500 hover:underline mx-1"
                    href={route("project.destroy", item.id)}
                >
                    Delete
                </Link>
            </Table.Cell>
        </Table.Row>
    );
}

export default ProjectTableRow;
