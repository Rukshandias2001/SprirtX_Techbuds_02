package com.example.TechBuds.Service.ServiceImpl;

import com.example.TechBuds.Entities.PlayerStats;
import com.example.TechBuds.Repositories.PlayerStatsRepository;
import com.example.TechBuds.Service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;


public class PlayerServiceImpl implements PlayerService {

    @Autowired
    PlayerStatsRepository playerStatsRepository;

    @Override
    public ArrayList<PlayerStats> getPlayerStats() {
        List<PlayerStats> all = playerStatsRepository.findAll();
        return new ArrayList<>(all);
    }
}
