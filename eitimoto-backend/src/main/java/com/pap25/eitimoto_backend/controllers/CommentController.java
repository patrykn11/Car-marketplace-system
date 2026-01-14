package com.pap25.eitimoto_backend.controllers;

import com.pap25.eitimoto_backend.dto.CommentDto;
import com.pap25.eitimoto_backend.dto.CommentResponseDto;
import com.pap25.eitimoto_backend.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
public class CommentController {
    final private CommentService commentService;

    @PostMapping("/add-com")
    public ResponseEntity<CommentResponseDto> addComment(@RequestBody CommentDto commentDto){
        return ResponseEntity.ok(commentService.addComment(commentDto));
    }

    @GetMapping("/getParents/{adv_id}")
    public ResponseEntity<List<CommentResponseDto>> getParents(@PathVariable Long adv_id){
        return ResponseEntity.ok(commentService.getParents(adv_id));
    }

    @GetMapping("/getChildren/{parent_id}")
    public ResponseEntity<List<CommentResponseDto>> getChildren(@PathVariable Long parent_id){
        return ResponseEntity.ok(commentService.getChildren(parent_id));
    }
}
