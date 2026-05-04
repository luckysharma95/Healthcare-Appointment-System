package com.lucky.healthcare.service;

import com.lucky.healthcare.model.Appointment;
import com.lucky.healthcare.model.Doctor;
import com.lucky.healthcare.model.Patient;
import com.lucky.healthcare.repository.AppointmentRepository;
import com.lucky.healthcare.repository.DoctorRepository;
import com.lucky.healthcare.repository.PatientRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentService(AppointmentRepository appointmentRepository, PatientRepository patientRepository, DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    public Appointment bookAppointment(Appointment appointment) {
        Patient patient = patientRepository.findById(appointment.getPatientId()).orElseThrow(() -> new RuntimeException("Patient not found"));
        Doctor doctor = doctorRepository.findById(appointment.getDoctorId()).orElseThrow(() -> new RuntimeException("Doctor not found"));
        appointment.setPatientName(patient.getName());
        appointment.setDoctorName(doctor.getName());
        appointment.setStatus("Pending");
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getByPatient(String patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public List<Appointment> getAll() {
        return appointmentRepository.findAll();
    }

    public Appointment updateStatus(String id, String status) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }
}
