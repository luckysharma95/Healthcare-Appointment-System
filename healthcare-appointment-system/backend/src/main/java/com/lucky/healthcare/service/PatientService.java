package com.lucky.healthcare.service;

import com.lucky.healthcare.model.Patient;
import com.lucky.healthcare.repository.PatientRepository;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class PatientService {
    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Patient register(Patient patient) {
        if (patientRepository.findByEmail(patient.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        return patientRepository.save(patient);
    }

    public Map<String, Object> login(String email, String password) {
        Patient patient = patientRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        if (!patient.getPassword().equals(password)) {
            throw new RuntimeException("Invalid email or password");
        }
        Map<String, Object> response = new HashMap<>();
        response.put("id", patient.getId());
        response.put("name", patient.getName());
        response.put("email", patient.getEmail());
        response.put("message", "Login successful");
        return response;
    }
}
