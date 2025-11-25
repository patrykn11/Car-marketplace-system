package com.pap25.eitimoto_backend.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@Table( name = "Advertisement" )
public class Advertisement {
        
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long advertisementId;

    private String description;

    @Column(nullable=false)
    private String title;

    @Column(nullable=false)
    private LocalDateTime createdAt;

    @Column(nullable=false)
    private LocalDateTime updatedAt;
    
    @Column(nullable=false)
    private AdvertisementStatus status;
}
