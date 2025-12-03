package com.pap25.eitimoto_backend.dto;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class UserProfileResponseDto {
        private String email;
        private String username;
        private String contactNumber;
        private String location;
}
