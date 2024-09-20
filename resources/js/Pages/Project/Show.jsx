import { PageContent } from "@/Components";
import { STATUS } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TasksTable from "../Task/Taskstable";

function Show({ auth, project, tasks, queryParams }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Project: {project.name}
                </h2>
            }
        >
            <Head title="Project" />
            <PageContent>
                <div>
                    <img
                        src={project.image_path}
                        alt="project image"
                        className="w-full h-64 object-cover"
                    />
                </div>
                <div className="grid grid-cols-2 gap-1 mt-4">
                    <div className="flex flex-col gap-3">
                        <div className=" border-b border-b-gray-400">
                            <label className="font-bold text-lg text-gray-200">
                                Project ID
                            </label>
                            <p className="mt-1">{project.id}</p>
                        </div>
                        <div>
                            <label className="font-bold text-lg text-gray-200">
                                Project Name
                            </label>
                            <p className="mt-1">{project.name}</p>
                        </div>

                        <div>
                            <label className="font-bold text-lg text-gray-200">
                                Project Status
                            </label>
                            <p className="mt-1">
                                <span
                                    className={`w-2/5 flex justify-center px-2 py-1 rounded text-white ${
                                        STATUS[project.status]?.color
                                    }`}
                                >
                                    {STATUS[project.status].label}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div>
                        <div>
                            <label className="font-bold text-lg text-gray-300">
                                Due Date
                            </label>
                            <p className="mt-1">{project.due_date}</p>
                        </div>
                        <div>
                            <label className="font-bold text-lg text-gray-200">
                                Create Date
                            </label>
                            <p className="mt-1">{project.created_at}</p>
                        </div>
                        <div>
                            <label className="font-bold text-lg text-gray-200">
                                Updated By
                            </label>
                            <p className="mt-1">{project.updatedBy?.name}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <label className="font-bold text-lg text-gray-200">
                        Description
                    </label>
                    <p className="mt-1">{project.description}</p>
                </div>
            </PageContent>

            <PageContent>
                <TasksTable
                    tasks={tasks}
                    queryParams={queryParams}
                    hideProjectNameColumn
                />
            </PageContent>
        </AuthenticatedLayout>
    );
}

export default Show;
