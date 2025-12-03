package com.pap25.eitimoto_backend.dto;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class UpdateUserProfileRequestDto {
        private String username;
        private String contactNumber;
        private String email;
        private String location;
}
