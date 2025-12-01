package com.pap25.eitimoto_backend.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@Table(name = "Car")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carId;

    @Column(nullable = false)
    private String carBrand;

    @Column(nullable = false)
    private String carModel;

    @Column(nullable = false)
    private Integer productionYear;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private Integer mileage;
}