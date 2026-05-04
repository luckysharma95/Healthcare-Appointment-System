package com.lucky.healthcare.repository;

import com.lucky.healthcare.model.Doctor;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DoctorRepository extends MongoRepository<Doctor, String> {
}
