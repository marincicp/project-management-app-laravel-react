import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

const queryNames = {
    name: "Name",
    status: "Status",
    created_at: "Created At",
    due_date: "Due Date",
    id: "ID",
};

function SortHeader({ columnName, queryParams }) {
    const activeColumn = queryNames[queryParams.sort_field] === columnName;
    console.log(activeColumn, "queryParams");
    return (
        <div className="px-3 py-2 text-nowrap flex items-center justify-between gap-1 cursor-pointer">
            <span> {columnName}</span>

            <div>
                <ChevronUpIcon
                    className={`w-4 ${
                        activeColumn && queryParams.sort_direction === "asc"
                            ? "text-white font-bold"
                            : ""
                    }`}
                />
                <ChevronDownIcon
                    className={`w-4 mt-2 ${
                        activeColumn && queryParams.sort_direction === "desc"
                            ? "text-white font-bold"
                            : ""
                    }`}
                />
            </div>
        </div>
    );
}

export default SortHeader;
