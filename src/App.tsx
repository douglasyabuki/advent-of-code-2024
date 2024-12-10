import "./App.css";
import { Challenges } from "./components/challenges/Challenges";

function App() {
  return (
    <section className="layout">
      {/* <Navbar /> */}
      {/* <div className="layout relative flex transition-transform duration-150 ease-in-out lg:grid lg:grid-cols-app">
        <Sidebar /> */}
        <main className="page-container">
          <Challenges />
        </main>
      {/* </div> */}
    </section>
  );
}

export default App;
