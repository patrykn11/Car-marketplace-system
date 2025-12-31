package com.pap25.eitimoto_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDto {
    private String message;
    private Long advertisementId;
    private LocalDateTime timestamp;
    private String senderUsername;
}
