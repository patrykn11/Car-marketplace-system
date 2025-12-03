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

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "car_id", nullable = false, foreignKey = @ForeignKey(name = "fk_ad_car"))
    private Car car;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_ad_user_id"))
    private User user;

    @Column(nullable=false)
    private String title;

    @Column(nullable=false)
    private String location;

//    @Column(nullable=false)
//    private AdvertisementStatus status;
}
