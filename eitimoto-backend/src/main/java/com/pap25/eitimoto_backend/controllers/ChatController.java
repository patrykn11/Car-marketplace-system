package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.dto.ChatRequest;
import com.pap25.eitimoto_backend.dto.MessageDTO;
import com.pap25.eitimoto_backend.services.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/history/{otherUser}")
    public ResponseEntity<List<MessageDTO>> getConversation(
            @PathVariable String otherUser,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(chatService.getConversation(userDetails.getUsername(), otherUser));
    }

    @GetMapping("/partners")
    public ResponseEntity<List<String>> getChatPartners(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(chatService.getChatPartners(userDetails.getUsername()));
    }

    @PostMapping("/send")
    public ResponseEntity<MessageDTO> sendMessage(
            @RequestBody ChatRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(chatService.sendMessage(userDetails.getUsername(), request));
    }
}
