package com.example.TechBuds.Services;

import com.example.TechBuds.Entities.PlayerStats;
import com.example.TechBuds.Entities.User;
import com.example.TechBuds.Modal.PlayerPriceDTO;
import com.example.TechBuds.Modal.PlayerStatDTO;

import java.util.ArrayList;

public interface UserServiceInclude {

    Boolean addPlayer(String userId, String id,double playerPrice);
    Boolean deletePlayer(String userId, String id,double playerPrice);
    ArrayList<PlayerPriceDTO> listOfPlayers(ArrayList<String> listOfPlayers);
    User getUserById(String id);


}
