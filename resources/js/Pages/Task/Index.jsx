import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { ProjectTableRow, Table } from "@/Components";

function Index({ auth, tasks, queryParams = null }) {
    queryParams = queryParams || {};
    console.log(tasks, "tasks");
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

    // const onSortChange = (name) => {
    //     console.log(name);
    //     console.log(queryParams);

    //     if (name === queryParams.sort_field) {
    //         if (queryParams.sort_direction === "asc") {
    //             queryParams.sort_direction = "desc";
    //         } else {
    //             queryParams.sort_direction = "asc";
    //         }
    //     } else {
    //         queryParams.sort_field = name;
    //         queryParams.sort_direction = "asc";
    //     }

    //     router.get(route("project.index"), queryParams);
    // };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Tasks
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div>
                                <TextInput
                                    defaultValue={queryParams.name}
                                    className="w-2/5 mb-5"
                                    placeholder="Task Name"
                                    onBlur={(e) =>
                                        onSearchFieldChange(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) => onKeyPress("name", e)}
                                />
                            </div>
                            <div className="overflow-auto"></div>

                            <Table
                                columns="2rem minmax(min-content,2fr) 1fr 1fr 1fr 1fr 1fr"
                                queryParams={queryParams}
                                sortRoute="project.index"
                            >
                                <Table.Header>
                                    <Table.SortableHeader
                                        queryName="id"
                                        label="ID"
                                    />
                                    <Table.BasicHeader label="Image" />
                                    <Table.SortableHeader
                                        queryName="name"
                                        label="Name"
                                    />
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
                                            <option value="">
                                                Select Status...
                                            </option>
                                            <option value="in_progress">
                                                In Progress
                                            </option>
                                            <option value="pending">
                                                Pending
                                            </option>
                                            <option value="completed">
                                                Completed
                                            </option>
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
                                        <ProjectTableRow
                                            item={task}
                                            key={task.id}
                                        />
                                    )}
                                ></Table.Body>
                            </Table>

                            <Pagination links={tasks.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
