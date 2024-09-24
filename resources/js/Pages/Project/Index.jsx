import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { PageContent, ProjectTableRow, Table } from "@/Components";

function Index({ auth, projects, queryParams = null, success }) {
    queryParams = queryParams || {};
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
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Projects
                    </h2>
                    <Link
                        href={route("project.create")}
                        className="bg-emerald-500 py-1 px-3 rounded shadow transition-all hover:bg-emerald-300"
                    >
                        Add new project
                    </Link>
                </div>
            }
        >
            <Head title="Projects" />

            {/* TODO srediti message */}
            {success && (
                <div className="bg-emerald-600 text-white rounded">
                    {success}
                </div>
            )}
            <PageContent>
                <div>
                    <TextInput
                        defaultValue={queryParams.name}
                        className="w-2/5 mb-5"
                        placeholder="Project Name"
                        onBlur={(e) =>
                            onSearchFieldChange("name", e.target.value)
                        }
                        onKeyPress={(e) => onKeyPress("name", e)}
                    />
                </div>
                <div className="overflow-auto">
                    <Table
                        columns="2rem minmax(min-content,2fr) 1fr 1fr 1fr 1fr 1fr"
                        queryParams={queryParams}
                        sortRoute="project.index"
                    >
                        <Table.Header>
                            <Table.SortableHeader queryName="id" label="ID" />
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
                                    <option value="">Select Status...</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
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
                            data={projects.data}
                            render={(project) => (
                                <ProjectTableRow
                                    item={project}
                                    key={project.id}
                                />
                            )}
                        ></Table.Body>
                    </Table>
                </div>
                <Pagination links={projects.meta.links} />
            </PageContent>
        </AuthenticatedLayout>
    );
}

export default Index;
