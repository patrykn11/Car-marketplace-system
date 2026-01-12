package com.pap25.eitimoto_backend.services;

import com.pap25.eitimoto_backend.dto.CommentDto;
import com.pap25.eitimoto_backend.dto.CommentResponseDto;
import com.pap25.eitimoto_backend.entities.Advertisement;
import com.pap25.eitimoto_backend.entities.Comment;
import com.pap25.eitimoto_backend.repository.AdvertisementRepository;
import com.pap25.eitimoto_backend.repository.CommentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final AdvertisementRepository advertisementRepository;

    @Transactional
    public CommentResponseDto addComment(CommentDto commentDto){
        Advertisement ad = advertisementRepository.findById(commentDto.getAdvertisement_id()).orElseThrow(() -> new RuntimeException("Advertisement not found"));

        Comment parent = null;
        if(commentDto.getParent_id() != null){
            parent = commentRepository.findById(commentDto.getParent_id()).orElseThrow(
                    () -> new RuntimeException("you are trying to reply to non exist comment")
            );
        }
        Comment comment = Comment
                .builder()
                .content(commentDto.getContent())
                .advertisement(ad)
                .parent(parent)
                .build();
        commentRepository.save(comment);
        CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                .content(commentDto.getContent())
                .comment_id(comment.getId())
                .build();

        return commentResponseDto;

    }

    public List<CommentResponseDto> getParents(Long advertisement_id){
        Advertisement ad = advertisementRepository.findById(advertisement_id).orElseThrow(
                () -> new RuntimeException("Advertisement does not exist")
        );
        return commentRepository.findParents(advertisement_id).stream().map(
                comment -> {
                    return CommentResponseDto.builder()
                            .content(comment.getContent())
                            .comment_id(comment.getId())
                            .build();

                }
        ).toList();
    }

    public List<CommentResponseDto> getChildren(Long parentId) {
        Comment parent = commentRepository.findById(parentId)
                .orElseThrow(() -> new RuntimeException("Parent comment not found"));

        return commentRepository.findChildren(parentId).stream()
                .map(comment -> CommentResponseDto.builder()
                        .content(comment.getContent())
                        .comment_id(comment.getId())
                        .build()
                ).toList();
    }



}
