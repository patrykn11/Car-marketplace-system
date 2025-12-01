package com.pap25.eitimoto_backend.repository;

import com.pap25.eitimoto_backend.entities.Role;
import com.pap25.eitimoto_backend.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import static org.assertj.core.api.Assertions.assertThat;


@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void testFindByUsername() {

        User user = User.builder()
                .username("testuser")
                .password("password")
                .role(Role.USER)
                .build();

        entityManager.persist(user);
        entityManager.flush();

        User found = userRepository.findByUsername("testuser").orElse(null);
        assertThat(found).isNotNull();
        assertThat(found.getUsername()).isEqualTo(user.getUsername());
    }

    @Test
    public void testExistsByUsername() {

        User user = User.builder()
                .username("existinguser")
                .password("password")
                .role(Role.USER)
                .build();

        entityManager.persist(user);
        entityManager.flush();

        boolean exists = userRepository.existsByUsername("existinguser");
        assertThat(exists).isTrue();

        boolean notExists = userRepository.existsByUsername("nonexistinguser");
        assertThat(notExists).isFalse();
    }

    @Test
    void testFindByUsernameNotFound() {
        User found = userRepository.findByUsername("nonexistent").orElse(null);
        assertThat(found).isNull();
    }

    @Test
    void testExistsByUsernameFalse() {
        boolean exists = userRepository.existsByUsername("nonexistent");
        assertThat(exists).isFalse();
    }

    @Test
    void testExistsByUsernameTrue() {
        User user = User.builder()
                .username("existent")
                .password("password")
                .role(Role.USER)
                .build();

        entityManager.persist(user);
        entityManager.flush();

        boolean exists = userRepository.existsByUsername("existent");
        assertThat(exists).isTrue();
    }

    @Test
    void testFindByUsernameFound() {
        User user = User.builder()
                .username("founduser")
                .password("password")
                .role(Role.USER)
                .build();

        entityManager.persist(user);
        entityManager.flush();

        User found = userRepository.findByUsername("founduser").orElse(null);
        assertThat(found).isNotNull();
        assertThat(found.getUsername()).isEqualTo("founduser");
    }

    @Test
    void testSaveUser() {
        User user = User.builder()
                .username("newuser")
                .password("password")
                .role(Role.USER)
                .build();

        User savedUser = userRepository.save(user);
        assertThat(savedUser.getId()).isNotNull();

        User found = entityManager.find(User.class, savedUser.getId());
        assertThat(found).isNotNull();
        assertThat(found.getUsername()).isEqualTo("newuser");
    }

    @Test
    void testDeleteUser() {
        User user = User.builder()
                .username("tobedeleted")
                .password("password")
                .role(Role.USER)
                .build();

        entityManager.persist(user);
        entityManager.flush();

        userRepository.delete(user);

        User found = entityManager.find(User.class, user.getId());
        assertThat(found).isNull();
    }

    @Test
    void testCountUsers() {
        long initialCount = userRepository.count();

        User user1 = User.builder()
                .username("user1")
                .password("password")
                .role(Role.USER)
                .build();

        User user2 = User.builder()
                .username("user2")
                .password("password")
                .role(Role.USER)
                .build();

        entityManager.persist(user1);
        entityManager.persist(user2);
        entityManager.flush();

        long newCount = userRepository.count();
        assertThat(newCount).isEqualTo(initialCount + 2);
    }

    @Test
    void testFindAllUsers() {
        User user1 = User.builder()
                .username("alluser1")
                .password("password")
                .role(Role.USER)
                .build();

        User user2 = User.builder()
                .username("alluser2")
                .password("password")
                .role(Role.USER)
                .build();

        entityManager.persist(user1);
        entityManager.persist(user2);
        entityManager.flush();

        var users = userRepository.findAll();
        assertThat(users).hasSizeGreaterThanOrEqualTo(2);
        assertThat(users).extracting(User::getUsername)
                .contains("alluser1", "alluser2");
    }

    @Test
    void testUpdateUserPassword() {
        User user = User.builder()
                .username("updateuser")
                .password("oldpassword")
                .role(Role.USER)
                .build();

        entityManager.persist(user);
        entityManager.flush();

        user.setPassword("newpassword");
        userRepository.save(user);

        User updatedUser = entityManager.find(User.class, user.getId());
        assertThat(updatedUser.getPassword()).isEqualTo("newpassword");
    }

    @Test
    void testFindByUsernameCaseSensitivity() {
        User user = User.builder()
                .username("CaseSensitiveUser")
                .password("password")
                .role(Role.USER)
                .build();

        entityManager.persist(user);
        entityManager.flush();

        User foundExact = userRepository.findByUsername("CaseSensitiveUser").orElse(null);
        assertThat(foundExact).isNotNull();

        User foundDifferentCase = userRepository.findByUsername("casesensitiveuser").orElse(null);
        assertThat(foundDifferentCase).isNull();
    }

    @Test
    void testFindByUsernameAfterDeletion() {
        User user = User.builder()
                .username("deletetestuser")
                .password("password")
                .role(Role.USER)
                .build();

        entityManager.persist(user);
        entityManager.flush();

        userRepository.delete(user);

        User found = userRepository.findByUsername("deletetestuser").orElse(null);
        assertThat(found).isNull();
    }

    @Test
    void testFindByUsernameAfterUpdate() {
        User user = User.builder()
                .username("updatetestuser")
                .password("password")
                .role(Role.USER)
                .build();

        entityManager.persist(user);
        entityManager.flush();

        user.setUsername("updatedusername");
        userRepository.save(user);

        User foundOld = userRepository.findByUsername("updatetestuser").orElse(null);
        assertThat(foundOld).isNull();

        User foundNew = userRepository.findByUsername("updatedusername").orElse(null);
        assertThat(foundNew).isNotNull();
        assertThat(foundNew.getUsername()).isEqualTo("updatedusername");
    }

    @Test
    void testSaveMultipleUsers() {
        User user1 = User.builder()
                .username("multiuser1")
                .password("password1")
                .role(Role.USER)
                .build();

        User user2 = User.builder()
                .username("multiuser2")
                .password("password2")
                .role(Role.USER)
                .build();

        userRepository.save(user1);
        userRepository.save(user2);
        entityManager.flush();

        User found1 = userRepository.findByUsername("multiuser1").orElse(null);
        User found2 = userRepository.findByUsername("multiuser2").orElse(null);

        assertThat(found1).isNotNull();
        assertThat(found2).isNotNull();
    }

    @Test
    void testDeleteNonExistingUser() {
        User user = User.builder()
                .id(999L)
                .username("nonexistinguser")
                .password("password")
                .role(Role.USER)
                .build();

        try {
            userRepository.delete(user);
            entityManager.flush();
        } catch (Exception e) {
            // No exception should be thrown
        }

        User found = userRepository.findByUsername("nonexistinguser").orElse(null);
        assertThat(found).isNull();
    }

    @Test
    void testCountUsersAfterDeletion() {
        User user = User.builder()
                .username("countdeletetestuser")
                .password("password")
                .role(Role.USER)
                .build();

        entityManager.persist(user);
        entityManager.flush();

        long countBefore = userRepository.count();

        userRepository.delete(user);
        entityManager.flush();

        long countAfter = userRepository.count();
        assertThat(countAfter).isEqualTo(countBefore - 1);
    }
}

