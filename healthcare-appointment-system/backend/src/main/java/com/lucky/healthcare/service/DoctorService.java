package com.lucky.healthcare.service;

import com.lucky.healthcare.model.Doctor;
import com.lucky.healthcare.repository.DoctorRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor addDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(String id, Doctor doctor) {
        Doctor oldDoctor = doctorRepository.findById(id).orElseThrow(() -> new RuntimeException("Doctor not found"));
        oldDoctor.setName(doctor.getName());
        oldDoctor.setSpecialization(doctor.getSpecialization());
        oldDoctor.setExperience(doctor.getExperience());
        oldDoctor.setAvailability(doctor.getAvailability());
        oldDoctor.setFees(doctor.getFees());
        return doctorRepository.save(oldDoctor);
    }

    public void deleteDoctor(String id) {
        doctorRepository.deleteById(id);
    }
}
