package com.example.TechBuds.Services;

import com.example.TechBuds.Entities.PlayerStats;
import com.example.TechBuds.Modal.PlayerPriceDTO;
import com.example.TechBuds.Modal.PlayerStatDTO;

import java.util.ArrayList;

public interface PlayerService {
    ArrayList<PlayerStatDTO> getPlayerStats();
    ArrayList<PlayerPriceDTO> getPlayerPrice();

    ArrayList<PlayerStats> getPlayer();
    PlayerStats savePlayerStat(PlayerStats playerStat);
    boolean deletePlayerStat(String id);



}
