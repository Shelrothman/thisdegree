import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import { getInvoices } from "../data/data";
import QueryNavLink from "../utils/QueryNavLink";


export default function Samples() {
    let invoices = getInvoices();
    let [searchParams, setSearchParams] = useSearchParams(); //! very useful, check out how as user types in to the input, the url address changes instantly
    return (
        <div style={{ display: "flex" }}>
            <nav style={{ borderRight: "solid 1px", padding: "1rem"}}>
                <input
                    value={searchParams.get("filter") || ""}
                    onChange={(event) => {
                        let filter = event.target.value;
                        if (filter) {
                            setSearchParams({ filter });
                        } else {
                            setSearchParams({});
                        }
                    }}
                />
                {invoices
                    .filter((invoice) => {
                        let filter = searchParams.get("filter");
                        if (!filter) return true;
                        let name = invoice.name.toLowerCase();
                        return name.startsWith(filter.toLowerCase());
                    })
                    .map((invoice) => (
                        <QueryNavLink 
                        // using custom link to persist search params
                        // if we didn't want to persis, we cud use plain <NavLink>
                            style={({ isActive }) => {
                                return {
                                    display: "block",
                                    margin: "1rem 0",
                                    color: isActive ? "red" : "",
                                };
                            }}
                            to={`/samples/${invoice.number}`}
                            key={invoice.number}
                        >
                            {invoice.name}
                        </QueryNavLink>
                    ))}
            </nav>
            <Outlet />
        </div>
    );
}