package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT comm FROM Comment comm" +
            " WHERE comm.parent is NULL and comm.advertisement.advertisementId = :adv_id" )
    List<Comment> findParents(@Param("adv_id") Long adv_id);

    @Query("SELECT comm FROM Comment comm" +
            " WHERE comm.parent.id = :parent_id " )
    List<Comment> findChildren(@Param("parent_id") Long parent_id);
}
