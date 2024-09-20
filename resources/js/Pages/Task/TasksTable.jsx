import { Table } from "@/Components";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TaskTableRow from "./TaskTableRow";
import { router } from "@inertiajs/react";

function TasksTable({
    queryParams = null,
    tasks,
    hideProjectNameColumn = false,
}) {
    queryParams = queryParams || {};
    console.log(hideProjectNameColumn, "hideProjectNameColumn");
    const onSearchFieldChange = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("project.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        onSearchFieldChange(name, e.target.value);
    };

    return (
        <>
            <div className="overflow-auto">
                <Table
                    columns="2rem minmax(min-content,2fr) 1fr 1fr 1fr 1fr 1fr"
                    queryParams={queryParams}
                    sortRoute="project.index"
                >
                    <Table.Header>
                        <Table.SortableHeader queryName="id" label="ID" />
                        <Table.BasicHeader label="Image" />

                        {!hideProjectNameColumn && (
                            <Table.BasicHeader label="Project Name" />
                        )}

                        <Table.SortableHeader queryName="name" label="Name" />
                        <th>
                            <SelectInput
                                defaultValue={queryParams.status}
                                className="w-full"
                                onChange={(e) =>
                                    onSearchFieldChange(
                                        "status",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">Select Status...</option>
                                <option value="in_progress">In Progress</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </SelectInput>
                        </th>
                        <Table.SortableHeader
                            queryName="created_at"
                            label="Created At"
                        />
                        <Table.SortableHeader
                            queryName="due_date"
                            label="Due Date"
                        />
                        <Table.BasicHeader label="Created By" />
                        <Table.BasicHeader label="Actions" />
                    </Table.Header>
                    <Table.Body
                        data={tasks.data}
                        render={(task) => (
                            <TaskTableRow
                                item={task}
                                key={task.id}
                                hideProjectNameColumn={hideProjectNameColumn}
                            />
                        )}
                    ></Table.Body>
                </Table>
            </div>
            <Pagination links={tasks.meta.links} />
        </>
    );
}

export default TasksTable;
