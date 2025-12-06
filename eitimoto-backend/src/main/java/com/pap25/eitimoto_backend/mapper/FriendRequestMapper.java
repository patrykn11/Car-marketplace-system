package com.pap25.eitimoto_backend.mapper;
import com.pap25.eitimoto_backend.dto.FriendRequestResponseDto;
import com.pap25.eitimoto_backend.dto.UserProfileResponseDto;

import com.pap25.eitimoto_backend.entities.FriendRequest;
import com.pap25.eitimoto_backend.entities.User;
import org.springframework.stereotype.Component;

@Component
public class FriendRequestMapper {

    public FriendRequestResponseDto toDto(FriendRequest friendRequest) {
        User userSender = friendRequest.getSender();
        User userReceiver = friendRequest.getReceiver();

        UserProfileResponseDto userSenderDto = UserProfileResponseDto.builder()
                .username(userSender.getUsername())
                .email(null)
                .contactNumber(null)
                .location(null).build();

        UserProfileResponseDto userReceiverDto = UserProfileResponseDto.builder()
                .username(userReceiver.getUsername())
                .email(null)
                .contactNumber(null)
                .location(null).build();

        return FriendRequestResponseDto.builder()
                .sender(userSenderDto)
                .receiver(userReceiverDto)
                .status(friendRequest.getStatus())
                .build();


    }
}
