import Register from "./components/publicpages/Register";
import Login from "./components/publicpages/Login";
import Layout from "./components/publicpages/Layout";
import Missing from "./components/publicpages/Missing";
import Unauthorized from "./components/publicpages/Unauthorized";
import LinkPage from "./components/publicpages/LinkPage";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import RoleAssignment from "./components/Role_Assignment";
import Bill_Processing1 from "./components/billComponents/Bill_Processing1";
import Bill_Processing2 from "./components/billComponents/Bill_Processing2";

function App() {
  const [fileList, setFileList] = useState([]);
  const [allPermissions, setAllPermissions] = useState({});

  useEffect(() => {
    // Function to fetch the list of files
    const fetchFileList = async () => {
      try {
        const context = require.context(
          "./components/permissions",
          false,
          /\.js$/
        );
        const fileNames = context
          .keys()
          .map((key) => key.slice(2).replace(".js", ""));

        setAllPermissions(
          Object.fromEntries(fileNames.map((key) => [key.toUpperCase(), false]))
        );
        setFileList(fileNames);
      } catch (error) {
        console.error("Error fetching file list:", error);
      }
    };
    fetchFileList();
  }, []);

  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/linkpage" element={<LinkPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route element={<RequireAuth allowedPermissions={"HOME"} />}>
          <Route path="/" element={<Layout />}>
            {/* we want to protect these routes */}
            <Route
              element={<RequireAuth allowedPermissions={"ROLE_ASSIGNMENT"} />}
            >
              <Route
                path="/role_assignment"
                element={<RoleAssignment allPermissions={allPermissions} />}
              />
            </Route>

            <Route
              element={<RequireAuth allowedPermissions={"BILL_PROCESSING"} />}
            >
              <Route
                path="/bill_processing1"
                element={<Bill_Processing1 allPermissions={allPermissions} />}
              />

              <Route
                path="/bill_processing2"
                element={<Bill_Processing2 allPermissions={allPermissions} />}
              />
            </Route>

            {fileList?.map((file) => {
              const ComponentToRender = React.lazy(() =>
                import(`./components/permissions/${file}.js`)
              );

              if (!ComponentToRender) {
                // Handle the case where the component doesn't exist
                return <div>Component doesn't exists</div>;
              }

              return (
                <Route
                  key={file}
                  element={
                    <RequireAuth allowedPermissions={file.toUpperCase()} />
                  }
                >
                  <Route
                    path={file.toLowerCase()}
                    element={
                      <React.Suspense fallback={<div>Loading</div>}>
                        <ComponentToRender />
                      </React.Suspense>
                    }
                  />
                </Route>
              );
            })}

            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Route>
      </Routes>
    </React.Suspense>
  );
}

export default App;
