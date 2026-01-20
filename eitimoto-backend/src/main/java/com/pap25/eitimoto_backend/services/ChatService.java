package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.dto.ChatRequest;
import com.pap25.eitimoto_backend.dto.MessageDTO;
import com.pap25.eitimoto_backend.entities.Message;
import com.pap25.eitimoto_backend.entities.User;
import com.pap25.eitimoto_backend.repository.MessageRepository;
import com.pap25.eitimoto_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service responsible for handling chat functionality between users.
 * Manages sending messages, retrieving conversations,
 * and real-time message delivery via WebSocket.
 */
@Service
@RequiredArgsConstructor
public class ChatService {

        private final MessageRepository messageRepository;
        private final UserRepository userRepository;
        private final SimpMessagingTemplate messagingTemplate;

        /**
         * Send a message from one user to another.
         * Persists the message and delivers it via WebSocket to both parties.
         *
         * @param senderUsername the username of the message sender
         * @param request the chat request containing receiver and content
         * @return the sent message as a DTO
         * @throws UsernameNotFoundException if sender or receiver is not found
         */
        @Transactional
        public MessageDTO sendMessage(String senderUsername, ChatRequest request) {
                User sender = userRepository.findByUsername(senderUsername)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + senderUsername));
                User receiver = userRepository.findByUsername(request.getReceiverUsername())
                                .orElseThrow(() -> new UsernameNotFoundException(
                                                "User not found: " + request.getReceiverUsername()));

                Message message = Message.builder()
                                .sender(sender)
                                .receiver(receiver)
                                .content(request.getContent())
                                .timestamp(LocalDateTime.now())
                                .isRead(false)
                                .build();

                Message savedMessage = messageRepository.save(message);

                MessageDTO messageDTO = new MessageDTO(
                                savedMessage.getId(),
                                sender.getUsername(),
                                receiver.getUsername(),
                                savedMessage.getContent(),
                                savedMessage.getTimestamp(),
                                savedMessage.isRead());

                // Send to receiver via WebSocket
                // Destination: /user/{username}/queue/messages
                messagingTemplate.convertAndSendToUser(
                                receiver.getUsername(),
                                "/queue/messages",
                                messageDTO);

                // Send to sender via WebSocket (for multi-tab/device synchronization)
                messagingTemplate.convertAndSendToUser(
                                sender.getUsername(),
                                "/queue/messages",
                                messageDTO);

                return messageDTO;
        }

        /**
         * Retrieve the conversation history between two users.
         *
         * @param username1 the first user's username
         * @param username2 the second user's username
         * @return list of messages in the conversation
         * @throws UsernameNotFoundException if either user is not found
         */
        public List<MessageDTO> getConversation(String username1, String username2) {
                User user1 = userRepository.findByUsername(username1)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username1));
                User user2 = userRepository.findByUsername(username2)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username2));

                List<Message> messages = messageRepository.findConversation(user1, user2);

                return messages.stream()
                                .map(m -> new MessageDTO(
                                                m.getId(),
                                                m.getSender().getUsername(),
                                                m.getReceiver().getUsername(),
                                                m.getContent(),
                                                m.getTimestamp(),
                                                m.isRead()))
                                .collect(Collectors.toList());
        }

        /**
         * Get all users that have had a conversation with the specified user.
         *
         * @param username the username to find chat partners for
         * @return list of usernames of chat partners
         * @throws UsernameNotFoundException if user is not found
         */
        public List<String> getChatPartners(String username) {
                User user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

                // Use Set to remove duplicates just in case the query returns overlap
                // (Though the UNION query should handle it, converting to plain strings)
                List<User> partners = messageRepository.findChatPartners(user);

                return partners.stream()
                                .map(User::getUsername)
                                .distinct()
                                .collect(Collectors.toList());
        }
}
