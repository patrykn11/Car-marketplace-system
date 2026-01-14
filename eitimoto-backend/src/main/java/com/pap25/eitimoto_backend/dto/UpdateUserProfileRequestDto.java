package com.pap25.eitimoto_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserProfileRequestDto {
        private String newContactNumber;
        private String newEmail;
        private String newLocation;
}
