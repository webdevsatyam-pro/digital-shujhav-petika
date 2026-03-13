import { useState, useEffect } from "react";
import Header from "./components/Header";
import HomeView from "./components/HomeView";
import SubmitForm from "./components/SubmitForm";
import AdminView from "./components/AdminView";
import { loadEntries } from "./utils/storage";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router";

export default function App() {
  const [view, setView] = useState("home");
  const [entries, setEntries] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadEntries().then(setEntries);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
        fontFamily: "'Segoe UI', sans-serif",
        color: "#fff",
      }}>
      <Header view={view} setView={setView} setSubmitted={setSubmitted} />

      {view === "home" && (
        <HomeView
          entries={entries}
          setView={setView}
          setSubmitted={setSubmitted}
        />
      )}
      {view === "form" && (
        <SubmitForm
          entries={entries}
          setEntries={setEntries}
          submitted={submitted}
          setSubmitted={setSubmitted}
          setView={setView}
        />
      )}
      {view === "admin" && (
        <AdminView entries={entries} setEntries={setEntries} />
      )}
      <ToastContainer />
    </div>
  );
}
