import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { STATUS } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link, router } from "@inertiajs/react";

import { ProjectTableRow, SortHeader, Table } from "@/Components";

function Index({ auth, projects, queryParams = null }) {
    queryParams = queryParams || {};
    const queryParamsa = new URLSearchParams(location.search);
    console.log(queryParamsa, "sd");
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

    const onSortChange = (name) => {
        console.log(name);
        console.log(queryParams);

        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }

        router.get(route("project.index"), queryParams);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div>
                                <TextInput
                                    defaultValue={queryParams.name}
                                    className="w-2/5 mb-5"
                                    placeholder="Project Name"
                                    onBlur={(e) =>
                                        onSearchFieldChange(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) => onKeyPress("name", e)}
                                />
                            </div>
                            <div className="overflow-auto">
                                {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2  border-gray-500">
                                        <tr className="text-nowrap">
                                            <th
                                                onClick={(e) =>
                                                    onSortChange("id")
                                                }
                                            >
                                                <SortHeader
                                                    columnName="ID"
                                                    queryParams={queryParams}
                                                />
                                            </th>
                                            <th className="px-3 py-2">Image</th>
                                            <th
                                                onClick={(e) =>
                                                    onSortChange("name")
                                                }
                                            >
                                                <SortHeader
                                                    columnName="Name"
                                                    queryParams={queryParams}
                                                />
                                            </th>
                                            <th
                                                onClick={(e) =>
                                                    onSortChange("status")
                                                }
                                            >
                                                <SortHeader
                                                    columnName="Status"
                                                    queryParams={queryParams}
                                                />
                                            </th>
                                            <th
                                                onClick={(e) =>
                                                    onSortChange("created_at")
                                                }
                                            >
                                                <SortHeader
                                                    columnName="Created At"
                                                    queryParams={queryParams}
                                                />
                                            </th>
                                            <th
                                                onClick={(e) =>
                                                    onSortChange("due_date")
                                                }
                                            >
                                                <SortHeader
                                                    columnName="Due Date"
                                                    queryParams={queryParams}
                                                />
                                            </th>
                                            <th className="px-3 py-2">
                                                <span>Created By</span>
                                            </th>
                                            <th className="px-3 py-2">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2  border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2">
                                                <SelectInput
                                                    defaultValue={
                                                        queryParams.status
                                                    }
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
                                            <th className="px-3 py-2 text-nowrap"></th>
                                            <th className="px-3 py-2 text-nowrap"></th>
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.data.map((project) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={project.id}
                                            >
                                                <th className="px-3-py-2">
                                                    {project.id}
                                                </th>
                                                <td className="px-3 py-3">
                                                    <img
                                                        width={80}
                                                        src={project.image_path}
                                                        alt="project img"
                                                    />
                                                </td>
                                                <td className="px-3 py-3">
                                                    {project.name}
                                                </td>
                                                <td className="px-3 py-3">
                                                    <span
                                                        className={` flex justify-center px-2 py-1 rounded text-white ${
                                                            STATUS[
                                                                project.status
                                                            ]?.color
                                                        }`}
                                                    >
                                                        {
                                                            STATUS[
                                                                project.status
                                                            ].label
                                                        }
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3">
                                                    {project.created_at}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {project.due_date}
                                                </td>

                                                <td className="px-3 py-3">
                                                    {project.createdBy.name}
                                                </td>
                                                <td className="px-3 py-3">
                                                    <Link
                                                        className="text-blue-500 hover:underline mx-1"
                                                        href={route(
                                                            "project.edit",
                                                            project.id
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        className="text-red-500 hover:underline mx-1"
                                                        href={route(
                                                            "project.destroy",
                                                            project.id
                                                        )}
                                                    >
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table> */}
                            </div>

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
                                    data={projects.data}
                                    render={(project) => (
                                        <ProjectTableRow
                                            item={project}
                                            key={project.id}
                                        />
                                    )}
                                ></Table.Body>
                            </Table>

                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
