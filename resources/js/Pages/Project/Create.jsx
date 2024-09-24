import { PageContent } from "@/Components";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { TextAreaInput } from "@/Components";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
function Create({ auth }) {
    const onSubmit = (e) => {
        e.preventDefault();

        console.log(data, "data");
        post(route("project.store"));
    };

    const { data, setData, post, errors, reset } = useForm({
        image: "",
        name: "",
        status: "",
        description: "",
        due_date: "",
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Create new project
                    </h2>
                    {/* <Link
                        href={route("project.create")}
                        className="bg-emerald-500 py-1 px-3 rounded shadow transition-all hover:bg-emerald-300"
                    >
                        Add new project
                    </Link> */}
                </div>
            }
        >
            <Head title="Projects" />

            <PageContent>
                <form
                    onSubmit={onSubmit}
                    className="w-3/5 "
                    encType="multipart/form-data"
                >
                    <div>
                        <InputLabel
                            value="Project Image"
                            htmlFor="project_image_path"
                        />

                        <TextInput
                            id="project_image_path"
                            type="file"
                            name="image"
                            className="block w-full mt-2"
                            onChange={(e) => {
                                console.log(e.target.files);
                                setData("image", e.target.files[0]);
                            }}
                        />

                        <InputError message={errors.image} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel
                            value="Project Name"
                            htmlFor="project_name"
                        />

                        <TextInput
                            id="project_name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="block w-full mt-2"
                            onChange={(e) => setData("name", e.target.value)}
                            isFocused={true}
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            value="Project Description"
                            htmlFor="project_description"
                        />

                        <TextAreaInput
                            id="project_description"
                            name="description"
                            value={data.description}
                            className="block w-full mt-2"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            value="Project Deadline"
                            htmlFor="project_due_date"
                        />

                        <TextInput
                            id="project_due_date"
                            type="date"
                            name="due_date"
                            value={data.due_date}
                            className="block w-full mt-2"
                            onChange={(e) =>
                                setData("due_date", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.due_date}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            value="Project Status"
                            htmlFor="project_status"
                        />

                        <SelectInput
                            name="status"
                            className="block w-full mt-2"
                            onChange={(e) => setData("status", e.target.value)}
                        >
                            <option value="">Select status...</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </SelectInput>

                        <InputError
                            message={errors.due_date}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4 text-right">
                        <Link
                            className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                            href={route("project.index")}
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="bg-emerald-500 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-emerald-700 mr-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </PageContent>
        </AuthenticatedLayout>
    );
}

export default Create;
