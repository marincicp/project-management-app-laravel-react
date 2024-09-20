import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PageContent } from "@/Components";
import TasksTable from "./Taskstable";

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

            <PageContent>
                <div>
                    <TextInput
                        defaultValue={queryParams.name}
                        className="w-2/5 mb-5"
                        placeholder="Task Name"
                        onBlur={(e) =>
                            onSearchFieldChange("name", e.target.value)
                        }
                        onKeyPress={(e) => onKeyPress("name", e)}
                    />
                </div>
                <TasksTable queryParams={queryParams} tasks={tasks} />
            </PageContent>
        </AuthenticatedLayout>
    );
}

export default Index;
