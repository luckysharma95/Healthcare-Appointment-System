package com.lucky.healthcare.model;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "doctors")
public class Doctor {
    @Id
    private String id;
    @NotBlank
    private String name;
    @NotBlank
    private String specialization;
    private int experience;
    private String availability;
    private double fees;

    public Doctor() {}

    public Doctor(String name, String specialization, int experience, String availability, double fees) {
        this.name = name;
        this.specialization = specialization;
        this.experience = experience;
        this.availability = availability;
        this.fees = fees;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
    public int getExperience() { return experience; }
    public void setExperience(int experience) { this.experience = experience; }
    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }
    public double getFees() { return fees; }
    public void setFees(double fees) { this.fees = fees; }
}
