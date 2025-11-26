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
@Table( name = "Car" )
public class Car {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carId;
    @Column(unique = true, nullable = false)
    private String vinNumber;

    @Column(nullable = false)
    private String carBrand;
    @Column(nullable = false)
    private String carModel;
    @Column (nullable = false)
    private String carGeneration;
    @Column (nullable = false)
    private DriveType carDriveType;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "engine_id", nullable = false, foreignKey = @ForeignKey(name = "fk_ad_engine"))
    private Engine carEngine;
    @Column(nullable = false)
    private TransmissionType carTransmission;

    @Column(nullable = false)
    private Double fuelConsumption_CITY;
    @Column(nullable = false)
    private Double fuelConsumption_OUTSIDE_CITY;

    @Column(nullable = false, length = 4)
    private Integer productionYear;

    @Column(nullable = false)
    private Integer mileage;
    
    @Column(nullable = false)
    private String carColor;

    private String carDescription;
}
