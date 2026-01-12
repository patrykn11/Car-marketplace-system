package com.pap25.eitimoto_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {
    private Long id;
    private String senderUsername;
    private String receiverUsername;
    private String content;
    private LocalDateTime timestamp;
    private boolean isRead;
}
