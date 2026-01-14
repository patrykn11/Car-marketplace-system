package com.pap25.eitimoto_backend.entities;

import org.junit.jupiter.api.Test;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class CommentTest {

    @Test
    void builder_ShouldConstructValidComment() {
        Advertisement ad = Advertisement.builder().advertisementId(10L).build();
        Comment comment = Comment.builder()
                .id(1L)
                .content("Nice car!")
                .advertisement(ad)
                .build();

        assertNotNull(comment);
        assertEquals("Nice car!", comment.getContent());
        assertEquals(10L, comment.getAdvertisement().getAdvertisementId());
    }

    @Test
    void relationship_ShouldHandleParentAndReplies() {
        Comment parent = Comment.builder().id(1L).content("Parent").replies(new ArrayList<>()).build();
        Comment child = Comment.builder().id(2L).content("Child").parent(parent).build();

        parent.getReplies().add(child);

        assertEquals(1, parent.getReplies().size());
        assertEquals("Child", parent.getReplies().get(0).getContent());
        assertEquals("Parent", child.getParent().getContent());
    }
}
