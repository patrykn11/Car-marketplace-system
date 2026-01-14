package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.dto.CommentDto;
import com.pap25.eitimoto_backend.dto.CommentResponseDto;
import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.Comment;
import com.pap25.eitimoto_backend.repository.AdvertisementRepository;
import com.pap25.eitimoto_backend.repository.CommentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private AdvertisementRepository advertisementRepository;

    @InjectMocks
    private CommentService commentService;

    @Test
    void addComment_ShouldSaveAndReturnDto_WhenValid() {
        Long adId = 1L;
        CommentDto dto = new CommentDto();
        dto.setAdvertisement_id(adId);
        dto.setContent("Test comment");

        Advertisement ad = new Advertisement();
        ad.setAdvertisementId(adId);

        when(advertisementRepository.findById(adId)).thenReturn(Optional.of(ad));

        CommentResponseDto result = commentService.addComment(dto);

        assertNotNull(result);
        assertEquals("Test comment", result.getContent());
        verify(commentRepository).save(any(Comment.class));
    }

    @Test
    void addComment_ShouldThrowException_WhenAdNotFound() {
        Long adId = 99L;
        CommentDto dto = new CommentDto();
        dto.setAdvertisement_id(adId);

        when(advertisementRepository.findById(adId)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> commentService.addComment(dto));
    }

    @Test
    void addComment_ShouldReplyToParent_WhenParentIdProvided() {
        Long adId = 1L;
        Long parentId = 10L;
        CommentDto dto = new CommentDto();
        dto.setAdvertisement_id(adId);
        dto.setParent_id(parentId);
        dto.setContent("Reply");

        Advertisement ad = new Advertisement();
        ad.setAdvertisementId(adId);
        Comment parent = new Comment();
        parent.setId(parentId);

        when(advertisementRepository.findById(adId)).thenReturn(Optional.of(ad));
        when(commentRepository.findById(parentId)).thenReturn(Optional.of(parent));

        commentService.addComment(dto);

        verify(commentRepository).save(argThat(comment ->
            comment.getParent().getId().equals(parentId)
        ));
    }

    @Test
    void getParents_ShouldReturnListOfComments() {
        Long adId = 1L;
        Advertisement ad = new Advertisement();
        ad.setAdvertisementId(adId);

        Comment c1 = new Comment();
        c1.setId(10L);
        c1.setContent("Parent 1");

        when(advertisementRepository.findById(adId)).thenReturn(Optional.of(ad));
        when(commentRepository.findParents(adId)).thenReturn(List.of(c1));

        List<CommentResponseDto> result = commentService.getParents(adId);

        assertEquals(1, result.size());
        assertEquals("Parent 1", result.get(0).getContent());
    }

    @Test
    void getChildren_ShouldReturnListOfReplies() {
        Long parentId = 10L;
        Comment parent = new Comment();
        parent.setId(parentId);

        Comment c1 = new Comment();
        c1.setId(11L);
        c1.setContent("Child 1");

        when(commentRepository.findById(parentId)).thenReturn(Optional.of(parent));
        when(commentRepository.findChildren(parentId)).thenReturn(List.of(c1));

        List<CommentResponseDto> result = commentService.getChildren(parentId);

        assertEquals(1, result.size());
        assertEquals("Child 1", result.get(0).getContent());
    }
}
