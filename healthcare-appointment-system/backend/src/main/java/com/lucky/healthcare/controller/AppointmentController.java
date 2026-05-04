package com.lucky.healthcare.controller;

import com.lucky.healthcare.model.Appointment;
import com.lucky.healthcare.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    public ResponseEntity<?> bookAppointment(@Valid @RequestBody Appointment appointment) {
        try {
            return ResponseEntity.ok(appointmentService.bookAppointment(appointment));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getPatientAppointments(@PathVariable String patientId) {
        return appointmentService.getByPatient(patientId);
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAll();
    }

    @PutMapping("/{id}/status")
    public Appointment updateStatus(@PathVariable String id, @RequestBody Map<String, String> request) {
        return appointmentService.updateStatus(id, request.get("status"));
    }
}
