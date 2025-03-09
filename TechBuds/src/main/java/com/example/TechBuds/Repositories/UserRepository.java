package com.example.TechBuds.Repositories;

import com.example.TechBuds.Entities.Users;
import org.springframework.data.repository.CrudRepository;


public interface UserRepository extends CrudRepository<Users, String> {


}
