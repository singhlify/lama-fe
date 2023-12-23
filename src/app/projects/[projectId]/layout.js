import Sidebar from "./Sidebar";

export default function ProjectLayout({ children, params: { projectId } }) {
  return (
    <main>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content overflow-y-hidden">
          {children}

          {/* <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label> */}
        </div>

        <Sidebar projectId={projectId} />
      </div>
    </main>
  );
}
