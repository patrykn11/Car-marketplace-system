package com.pap25.eitimoto_backend.entities;

import com.pap25.eitimoto_backend.converters.VectorConverter;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnTransformer;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@Table( name = "advertisement" )
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

    @OneToMany(mappedBy = "advertisement", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Comment> comments = new ArrayList<>();

    @Column(nullable=false)
    private String title;

    @Column(nullable=false)
    private String location;

    @Column(columnDefinition = "bigint default 0")
    @Builder.Default
    private Long viewCount = 0L;

    @Column(columnDefinition = "bigint default 0")
    @Builder.Default
    private Long contactCount = 0L;

    @Column(columnDefinition = "bigint default 0")
    @Builder.Default
    private Long likeCount = 0L;

    @JdbcTypeCode(SqlTypes.VARBINARY)
    private byte[] image;

    @Column(name = "embedding", columnDefinition = "vector(1536)")
    @Convert(converter = VectorConverter.class)
    @ColumnTransformer(write = "?::vector")
    private List<Double> embedding;
}