import { STATUS } from "@/constants";
import { Table } from ".";
import { Link, router } from "@inertiajs/react";

function ProjectTableRow({ item }) {
    function onDelete(id) {
        if (!window.confirm("Are you sure you want to delete the project?"))
            return;

        router.delete(route("project.destroy", id));
    }

    return (
        <Table.Row>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>
                <img width={80} src={item.image_path} alt="project img" />
            </Table.Cell>
            <Table.Cell>
                <Link
                    href={route("project.show", item.id)}
                    className="hover:underline"
                >
                    {item.name}
                </Link>
            </Table.Cell>
            <Table.Cell>
                <span
                    className={` flex justify-center px-2 py-1 rounded text-white  ${
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
                <button
                    className="text-red-500 hover:underline mx-1"
                    onClick={() => onDelete(item.id)}
                >
                    Delete
                </button>
            </Table.Cell>
        </Table.Row>
    );
}

export default ProjectTableRow;
