import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/navbar.js';
import Records from './components/table.js';
import Forms from './components/form.js';
import HomePage from './components/homePage.js';
import LoginPage from './components/login.js';
import RegisterPage from './components/register.js';
import TaskCalendar from './components/sample_task.js';

function App() {
  const token = localStorage.getItem("token");
  const modules = [
    { index: 1, title: "Gift" },
    { index: 2, title: "Nozzle" },
    { index: 3, title: "Sales" },
    { index: 4, title: "Product" },
    { index: 5, title: "Employee" },
    { index: 6, title: "Task" },
    { index: 7, title: "Inspection"},
    { index: 8, title: "Purchase"},
    { index: 9, title: "Finance"}
];
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<HomePage />} />
          {modules.map((module) => (
  <Route
    key={module.title}
    path={`/${module.title}`}
    element={
      module.title === "Task" ? (
        <TaskCalendar module="Task"/>
      ) : (
        <Records module={module.title} />
      )
    }
  />
))}
              {modules.map((module) => (
                <Route key={`${module.title}/Form`} path={`/${module.title}/Form`} element={<Forms module={module.title} />} />
              ))}
              {modules.map((module) => (
                <Route key={`${module.title}/Edit`} path={`/${module.title}/Edit/:value`} element={<Forms module={module.title} />} />
              ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
