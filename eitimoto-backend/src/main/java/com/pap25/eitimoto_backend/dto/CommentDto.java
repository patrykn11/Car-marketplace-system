package com.pap25.eitimoto_backend.dto;

import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private String content;
    private Long advertisement_id;
    private Long parent_id; // main comment - null, reply - not null

}
