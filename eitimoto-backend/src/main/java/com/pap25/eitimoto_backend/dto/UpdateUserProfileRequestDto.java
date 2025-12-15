package com.pap25.eitimoto_backend.dto;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class UpdateUserProfileRequestDto {
        private String newContactNumber;
        private String newEmail;
        private String newLocation;
}
