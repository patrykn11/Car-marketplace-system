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
@Table( name = "car" )
public class Car {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carId;

    @Column(unique = true, nullable = false)
    private String vinNumber;

    @Column(nullable=false)
    private String carBrand;
    
    @Column(nullable=false)
    private String carModel;

    @Column(nullable=false, length = 4)
    private Integer productionYear;
    
    @Column(nullable=false)
    private String carColor;

    private String carDescription;
}
