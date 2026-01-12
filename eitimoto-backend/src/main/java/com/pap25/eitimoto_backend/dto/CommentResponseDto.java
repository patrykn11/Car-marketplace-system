package com.pap25.eitimoto_backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentResponseDto {
    private String content;
    private Long comment_id;
}
