package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.entities.Message;
import com.pap25.eitimoto_backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m WHERE (m.sender = :user1 AND m.receiver = :user2) OR (m.sender = :user2 AND m.receiver = :user1) ORDER BY m.timestamp ASC")
    List<Message> findConversation(@Param("user1") User user1, @Param("user2") User user2);

    @Query("SELECT DISTINCT m.sender FROM Message m WHERE m.receiver = :user UNION SELECT DISTINCT m.receiver FROM Message m WHERE m.sender = :user")
    List<User> findChatPartners(@Param("user") User user);
}
