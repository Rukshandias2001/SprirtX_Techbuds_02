package com.example.TechBuds.Repositories;

import com.example.TechBuds.Entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);

    boolean existsByUsernameAndAdminIsTrue(String username);

    List<User> findByIdIn(List<String> ids);

}
