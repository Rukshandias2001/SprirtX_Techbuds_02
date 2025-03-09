package com.example.TechBuds.Repositories;

import com.example.TechBuds.Entities.PlayerStats;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerStatsRepository extends MongoRepository<PlayerStats, String> {

    // Find players by a list of IDs
    List<PlayerStats> findByIdIn(List<String> ids);
}
