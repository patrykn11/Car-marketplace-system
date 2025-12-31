package com.pap25.eitimoto_backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserStatsDto {
    private Long totalViews;
    private Long totalContacts;
    private Long totalLikes;
}
