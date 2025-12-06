package com.pap25.eitimoto_backend.dto;

import com.pap25.eitimoto_backend.entities.FriendRequest;
import com.pap25.eitimoto_backend.entities.FriendshipStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FriendRequestResponseDto {
    private UserProfileResponseDto sender;
    private UserProfileResponseDto receiver;
    private FriendshipStatus status;
}
