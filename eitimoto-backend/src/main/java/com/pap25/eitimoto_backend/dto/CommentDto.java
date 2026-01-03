package com.pap25.eitimoto_backend.dto;

import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentDto {
    private String content;
    private Long advertisement_id;
    private Long parent_id; // main comment - null, reply - not null

}
