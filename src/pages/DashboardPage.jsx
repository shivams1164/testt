import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BloodPressureCard from "../components/BloodPressureCard";
import StatsCards from "../components/StatsCards";
import DiagnosticList from "../components/DiagnosticList";
import LabResultsCard from "../components/LabResultsCard";
import PatientProfileCard from "../components/PatientProfileCard";
import { fetchPatients } from "../services/patientService";

const TARGET_PATIENT_NAME = "Jessica Taylor";

function DashboardPage() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPatient() {
      try {
        setLoading(true);
        setError("");

        const patients = await fetchPatients(controller.signal);
        const selectedPatient = patients.find(
          (item) => item.name.toLowerCase() === TARGET_PATIENT_NAME.toLowerCase()
        );

        if (!selectedPatient) {
          throw new Error("Jessica Taylor was not found in API response.");
        }

        setPatient(selectedPatient);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message || "Something went wrong while loading data.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadPatient();

    return () => controller.abort();
  }, []);

  const latestDiagnosis = useMemo(() => {
    if (!patient?.diagnosis_history?.length) {
      return null;
    }
    return patient.diagnosis_history[patient.diagnosis_history.length - 1];
  }, [patient]);

  if (loading) {
    return (
      <div className="app-shell">
        <Header />
        <main className="dashboard-layout">
          <section className="skeleton-panel" />
          <section className="skeleton-main">
            <div className="skeleton-card" />
            <div className="skeleton-row">
              <div className="skeleton-card" />
              <div className="skeleton-card" />
              <div className="skeleton-card" />
            </div>
            <div className="skeleton-card" />
          </section>
          <section className="skeleton-panel" />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-shell">
        <Header />
        <main className="dashboard-layout">
          <section className="error-card">
            <h2>Unable to load dashboard</h2>
            <p>{error}</p>
            <p>
              If authentication fails, set REACT_APP_API_USERNAME and REACT_APP_API_PASSWORD
              in your environment.
            </p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell fade-in">
      <Header />
      <main className="dashboard-layout">
        <Sidebar patient={patient} />

        <section className="dashboard-main">
          <div className="card-panel">
            <h2 className="section-title">Diagnosis History</h2>
            <BloodPressureCard history={patient?.diagnosis_history || []} />
            <StatsCards diagnosis={latestDiagnosis} />
          </div>

          <div className="card-panel">
            <h2 className="section-title">Diagnostic List</h2>
            <DiagnosticList diagnostics={patient?.diagnostic_list || []} />
          </div>
        </section>

        <section className="dashboard-right">
          <PatientProfileCard patient={patient} />
          <LabResultsCard labResults={patient?.lab_results || []} />
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;
