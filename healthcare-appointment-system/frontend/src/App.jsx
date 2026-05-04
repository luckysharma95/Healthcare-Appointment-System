import { useEffect, useState } from "react";
import "./style.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [patient, setPatient] = useState({ name: "", email: "", password: "", phone: "" });

  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    experience: "",
    availability: "",
    fees: "",
  });

  const [appointment, setAppointment] = useState({
    patientEmail: "",
    doctorId: "",
    date: "",
    time: "",
    symptoms: "",
  });

  const loadDoctors = async () => {
    const res = await fetch(`${API}/doctors`);
    const data = await res.json();
    setDoctors(data);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const registerPatient = async () => {
    const res = await fetch(`${API}/patients/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    });

    if (res.ok) {
      alert("Account created successfully");
      setIsLogin(true);
    } else {
      alert("Registration failed");
    }
  };

  const loginPatient = async () => {
    const res = await fetch(`${API}/patients/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setAppointment({ ...appointment, patientEmail: loginData.email });
      alert("Login successful");
    } else {
      alert("Invalid email or password");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    alert("Logout successful");
  };

  const addDoctor = async () => {
    const res = await fetch(`${API}/doctors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...doctor,
        experience: Number(doctor.experience),
        fees: Number(doctor.fees),
      }),
    });

    if (res.ok) {
      alert("Doctor added successfully");
      setDoctor({ name: "", specialization: "", experience: "", availability: "", fees: "" });
      loadDoctors();
    }
  };

  const bookAppointment = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    const res = await fetch(`${API}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...appointment,
        patientEmail: user.email || loginData.email,
      }),
    });

    if (res.ok) alert("Appointment booked successfully");
    else alert("Appointment failed");
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">MediCare+</div>
        <div className="nav-links">
          <a href="#doctors">Doctors</a>
          <a href="#appointment">Book</a>
          <a href="#admin">Admin</a>
          {user && <button className="logout-btn" onClick={logout}>Logout</button>}
        </div>
      </nav>

      <section className="hero">
        <div>
          <span className="badge">Smart Healthcare System</span>
          <h1>Book Trusted Doctors Online</h1>
          <p>
            Register as a patient, login securely, view doctors, book appointments,
            and manage healthcare records easily.
          </p>
          <a href="#appointment" className="primary-btn">Book Appointment</a>
        </div>

        <div className="hero-card">
          {user ? (
            <div className="dashboard-box">
              <h3>Welcome, {user.name || "Patient"} 👋</h3>
              <p>You are logged in successfully.</p>
              <p><b>Email:</b> {user.email}</p>
              <a href="#appointment" className="primary-btn">Book Now</a>
            </div>
          ) : (
            <>
              <div className="tabs">
                <button className={isLogin ? "active-tab" : ""} onClick={() => setIsLogin(true)}>Login</button>
                <button className={!isLogin ? "active-tab" : ""} onClick={() => setIsLogin(false)}>Register</button>
              </div>

              {isLogin ? (
                <>
                  <h3>Patient Login</h3>
                  <input placeholder="Email" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                  <input type="password" placeholder="Password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                  <button onClick={loginPatient}>Login</button>
                </>
              ) : (
                <>
                  <h3>Create Patient Account</h3>
                  <input placeholder="Full Name" onChange={(e) => setPatient({ ...patient, name: e.target.value })} />
                  <input placeholder="Email" onChange={(e) => setPatient({ ...patient, email: e.target.value })} />
                  <input placeholder="Phone" onChange={(e) => setPatient({ ...patient, phone: e.target.value })} />
                  <input type="password" placeholder="Password" onChange={(e) => setPatient({ ...patient, password: e.target.value })} />
                  <button onClick={registerPatient}>Create Account</button>
                </>
              )}
            </>
          )}
        </div>
      </section>

      <section id="doctors" className="section">
        <h2>Available Doctors</h2>
        <p className="section-text">Choose from verified healthcare specialists.</p>

        <div className="doctor-grid">
          {doctors.map((doc) => (
            <div className="doctor-card" key={doc.id}>
              <div className="avatar">{doc.name?.charAt(0)}</div>
              <h3>{doc.name}</h3>
              <p className="special">{doc.specialization}</p>
              <p>{doc.experience} years experience</p>
              <p>{doc.availability}</p>
              <h4>₹{doc.fees}</h4>
              <a href="#appointment">Book Now</a>
            </div>
          ))}
        </div>
      </section>

      <section id="appointment" className="section form-section">
        <div className="form-card">
          <h2>Book Appointment</h2>

          <input value={user?.email || appointment.patientEmail} placeholder="Patient Email" readOnly />

          <select onChange={(e) => setAppointment({ ...appointment, doctorId: e.target.value })}>
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialization}</option>
            ))}
          </select>

          <input type="date" onChange={(e) => setAppointment({ ...appointment, date: e.target.value })} />
          <input type="time" onChange={(e) => setAppointment({ ...appointment, time: e.target.value })} />
          <textarea placeholder="Symptoms" onChange={(e) => setAppointment({ ...appointment, symptoms: e.target.value })}></textarea>

          <button onClick={bookAppointment}>Book Appointment</button>
        </div>
      </section>

      <section id="admin" className="section admin-section">
        <div className="form-card">
          <h2>Admin: Add Doctor</h2>

          <input placeholder="Doctor Name" value={doctor.name} onChange={(e) => setDoctor({ ...doctor, name: e.target.value })} />
          <input placeholder="Specialization" value={doctor.specialization} onChange={(e) => setDoctor({ ...doctor, specialization: e.target.value })} />
          <input placeholder="Experience" value={doctor.experience} onChange={(e) => setDoctor({ ...doctor, experience: e.target.value })} />
          <input placeholder="Availability" value={doctor.availability} onChange={(e) => setDoctor({ ...doctor, availability: e.target.value })} />
          <input placeholder="Fees" value={doctor.fees} onChange={(e) => setDoctor({ ...doctor, fees: e.target.value })} />

          <button onClick={addDoctor}>Add Doctor</button>
        </div>
      </section>

      <footer>
        <p>© 2026 MediCare+ | Full Stack Healthcare Appointment System</p>
      </footer>
    </div>
  );
}

export default App;