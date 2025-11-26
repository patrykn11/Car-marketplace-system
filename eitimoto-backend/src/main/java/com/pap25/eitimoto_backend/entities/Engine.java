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
@Table( name = "Engine" )
public class Engine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long engineId;
    
    @Column(nullable = false)
    private String engineBrand;

    /* --- Engine power information --- */ 
    @Column(nullable = false)
    private Integer enginePower;
    @Column(nullable = false)
    private Double enginePowerPerLitre;
    @Column(nullable = false)
    private Integer engineTorque;

    @Column(nullable = false, length = 4)
    private Integer startProductionYear;
    @Column(nullable = false, length = 4)
    private Integer finishProductionYear;

    @Column(unique = true, nullable = false)
    private String engineCode;
    
    /* --- Maximum engine capacity [cm^3] --- */
    @Column(nullable = false)
    private FuelType engineFuelType;
    @Column(nullable = false)
    private Integer engineDisplacement;
    @Column(nullable = false)
    private Integer numberOfPistons;
    @Column(nullable = false)
    private EngineConfiguration engineConfiguration;

    @Column(nullable = false)
    private Double engineOilCapacity;
}
