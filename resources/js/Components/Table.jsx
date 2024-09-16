import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { router } from "@inertiajs/react";
import { createContext, useContext } from "react";

const TableContext = createContext();

////////////////////////////////
// HEADER

function Header({ children, header }) {
    if (children) {
        return (
            <thead>
                <Row header>{children}</Row>
            </thead>
        );
    }

    if (header) {
        const headerTitles = header.split(" ");

        return (
            <thead>
                <Row header>
                    {map(headerTitles, (title) => (
                        <th key={title}>{title}</th>
                    ))}
                </Row>
            </thead>
        );
    }

    return null;
}

function SortableHeader({ queryName, label }) {
    const { queryParams, sortRoute } = useContext(TableContext);

    const onSortChange = () => {
        console.log(queryName);
        console.log(queryParams);

        if (queryName === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = queryName;
            queryParams.sort_direction = "asc";
        }

        //provjeriti hocu li route slati preko table contexta ili propsa
        router.get(route(sortRoute), queryParams);
    };

    const activeColumn = queryParams?.sort_field === queryName;
    return (
        <th onClick={onSortChange}>
            <div className="px-3 py-2 text-nowrap flex items-center  gap-2 cursor-pointer">
                <span> {label}</span>

                <div>
                    <ChevronUpIcon
                        className={`w-4 ${
                            activeColumn && queryParams.sort_direction === "asc"
                                ? "text-white font-bold"
                                : ""
                        }`}
                    />
                    <ChevronDownIcon
                        className={`w-4 ${
                            activeColumn &&
                            queryParams.sort_direction === "desc"
                                ? "text-white font-bold"
                                : ""
                        }`}
                    />
                </div>
            </div>
        </th>
    );
}

function BasicHeader({ label }) {
    return <th className="px-3 py-2">{label}</th>;
}

////////////////////////////////

//////////////////////////////
// BODY

function Body({ render, data }) {
    const { columns } = useContext(TableContext);
    if (data.length === 0)
        return (
            <tbody className="w-full text-2xl py-8">
                {/* <td align="center" className="w-full text-2xl py-8"> */}
                No data to display
                {/* </td> */}
            </tbody>
        );
    console.log(Object.keys(data[0]), "data");

    const columnNames = Object.keys(data[0]).filter(
        (column) => column !== "id"
    );

    return (
        <tbody style={{ gridTemplateColumns: columns }}>
            {render
                ? data.map(render)
                : data.map((item) => (
                      <td key={item.id}>
                          {columnNames.map((columnName) => (
                              <td key={columnName}>{item[columnName]}</td>
                          ))}
                      </td>
                  ))}
        </tbody>
    );
}

function Row({ children, className = "" }) {
    const { columns } = useContext(TableContext);

    return (
        <tr
            className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${className}`}
            style={{ gridTemplateColumns: columns }}
        >
            {children}
        </tr>
    );
}

function Cell({ children, className = "" }) {
    return (
        <td align="center" className={`px-3-py-2 ${className}`}>
            {children}
        </td>
    );
}

function Table({ columns, children, queryParams = null, sortRoute = "" }) {
    return (
        <TableContext.Provider value={{ columns, queryParams, sortRoute }}>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {children}
            </table>
        </TableContext.Provider>
    );
}

Table.Row = Row;
Table.Header = Header;
Table.SortableHeader = SortableHeader;
Table.BasicHeader = BasicHeader;
Table.Body = Body;
Table.Cell = Cell;

export default Table;
