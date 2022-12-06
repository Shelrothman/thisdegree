/* eslint-disable no-unused-vars */

/**
 * beginning to build out new Navbar
 */
import React, { useState } from 'react';
import RulesNav from './components/Navbar';

//TODO: the side bar can eventually have those routes as well... and grouped together the way its set up now mvc... like tenant, ruleAdmin, tester...etc
import { Samples, Dashboard, Profile, Logout, Sample } from './pages';
import { Route, Routes } from "react-router-dom"
import NoMatch from './utils/NoMatch';
import Footer from "./components/Footer";

export default function App() {
    const [ localTenant, setLocalTenant ] = useState();

    return (
        <>
            <RulesNav setLocalTenant={setLocalTenant} />
            <Routes>
                <Route path="/" element={<Dashboard />} >
                    <Route path="/samples" element={<Samples />}>
                        {/* index route for samples */}
                        <Route
                            index
                            element={
                                <main style={{ padding: "1rem" }}>
                                    <p>Select an invoice</p>
                                </main>
                            }
                        />
                        {/* Notice above has the index prop instead of a path. That's because the index route shares the path of the parent, which is the whole point.  */}
                        <Route path=":sampleId" element={<Sample />} />
                    </Route>


                    <Route path="/tenant" element={<NoMatch />}>
                        {/* allow user access once loggedIn/selectedTenant/authenticated */}

                        <Route path=":tenantId" element={<NoMatch />} />
                    </Route>

                    <Route path="/profile" element={<Profile />} />
                    <Route path="/logout" element={<Logout />} />
                    {/* match only when no other routes do */}
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
            <Footer tenant={localTenant}/>
        </>
    )
}