package com.example.TechBuds.Repositories;

import com.example.TechBuds.Entities.PlayerStats;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

@Repository
@Qualifier
public interface PlayerStatsRepository extends MongoRepository<PlayerStats, String> {

}
