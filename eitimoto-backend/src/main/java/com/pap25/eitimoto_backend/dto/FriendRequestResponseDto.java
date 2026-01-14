package com.pap25.eitimoto_backend.dto;

import com.pap25.eitimoto_backend.entities.FriendshipStatus;
import lombok.Builder;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FriendRequestResponseDto {
    private UserProfileResponseDto sender;
    private UserProfileResponseDto receiver;
    private FriendshipStatus status;
}
