package com.example.TechBuds.Services;

import com.example.TechBuds.Entities.PlayerStats;

import java.util.ArrayList;

public interface UserServiceInclude {

    Boolean addPlayer(String userId, String id,double playerPrice);
    Boolean deletePlayer(String userId, String id,double playerPrice);
    ArrayList<PlayerStats> listOfPlayers(ArrayList<String> listOfPlayers);


}
