package com.pap25.eitimoto_backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pap25.eitimoto_backend.dto.CommentDto;
import com.pap25.eitimoto_backend.dto.CommentResponseDto;
import com.pap25.eitimoto_backend.services.CommentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.core.userdetails.UserDetailsService;
import com.pap25.eitimoto_backend.services.JWTService;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = CommentController.class,
    excludeAutoConfiguration = {
        SecurityAutoConfiguration.class,
        SecurityFilterAutoConfiguration.class
    })
@AutoConfigureMockMvc(addFilters = false)
class CommentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CommentService commentService;

    @MockBean
    private JWTService jwtService;

    @MockBean
    private UserDetailsService userDetailsService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void addComment_ShouldReturnCreatedComment() throws Exception {
        CommentDto request = new CommentDto();
        request.setContent("Test comment");

        CommentResponseDto response = CommentResponseDto.builder().content("Test comment").build();

        given(commentService.addComment(any(CommentDto.class))).willReturn(response);

        mockMvc.perform(post("/api/comment/add-com")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("Test comment"));
    }

    @Test
    void getParents_ShouldReturnListOfComments() throws Exception {
        Long advId = 1L;
        CommentResponseDto comment = CommentResponseDto.builder().content("Parent comment").build();

        given(commentService.getParents(advId)).willReturn(List.of(comment));

        mockMvc.perform(get("/api/comment/getParents/{adv_id}", advId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].content").value("Parent comment"));
    }

    @Test
    void getChildren_ShouldReturnListOfComments() throws Exception {
        Long parentId = 1L;
        CommentResponseDto comment = CommentResponseDto.builder().content("Child comment").build();

        given(commentService.getChildren(parentId)).willReturn(List.of(comment));

        mockMvc.perform(get("/api/comment/getChildren/{parent_id}", parentId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].content").value("Child comment"));
    }
}
