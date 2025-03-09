package com.example.TechBuds.Services.ServiceImpl;

import com.example.TechBuds.Entities.PlayerStats;
import com.example.TechBuds.Entities.User;
import com.example.TechBuds.Modal.PlayerPriceDTO;
import com.example.TechBuds.Modal.PlayerStatDTO;
import com.example.TechBuds.Repositories.PlayerStatsRepository;
import com.example.TechBuds.Repositories.UserRepository;
import com.example.TechBuds.Services.UserService;
import com.example.TechBuds.Services.UserServiceInclude;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Qualifier
public class UserServiceImpl implements UserServiceInclude {

    @Autowired
    UserRepository userRepository;
    @Autowired
    PlayerStatsRepository playerStatsRepository;

    public Boolean addPlayer(String userId, String id,double playerPrice) {

        Optional<User> byId = userRepository.findById(userId);
        if(byId.isPresent()) {
            User user = byId.get();
            // Ensure listOfPlayers is modifiable
            Set<String> listOfPlayers = user.getListOfPlayers();
            if (listOfPlayers == null) {
                listOfPlayers = new HashSet<>();  // Initialize if null
                user.setListOfPlayers(listOfPlayers);
            }


            // Check if player already exists
            if (listOfPlayers.contains(id)) {
                return false; // Player already exists, return false
            }
            if(listOfPlayers.size()>11){
                return false;
            }
            double price = user.getPrice();
            double remain  = price - playerPrice;
            if(remain<0){
                return false;
            }
            // Add new player and save
            user.setPrice(remain);
            listOfPlayers.add(id);
            userRepository.save(user);
            return true;
        }else{
            return false;
        }

    }

    public Boolean deletePlayer(String userId, String id,double playerPrice) {
        Optional<User> byId = userRepository.findById(userId);
        if(byId.isPresent()) {
            User user = byId.get();
            Set<String> listOfPlayers = user.getListOfPlayers();
            if(listOfPlayers.contains(id)) {
                listOfPlayers.remove(id);
                user.setListOfPlayers(listOfPlayers);
                double price = user.getPrice();
                double remain = price + playerPrice;
                user.setPrice(remain);
                userRepository.save(user);
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public ArrayList<PlayerPriceDTO> listOfPlayers(ArrayList<String> listOfPlayers) {
        List<PlayerStats> playerList = playerStatsRepository.findByIdIn(listOfPlayers);
        ArrayList<PlayerPriceDTO> listOfPlayersDTO = new ArrayList<>();
        for (PlayerStats player : playerList) {
            Double striker = generateStats(player);
            PlayerPriceDTO instance = createInstancePlayerPrice(player, striker);

            listOfPlayersDTO.add(instance);

        }

        return listOfPlayersDTO;

    }
    public User getUserById(String id) {
        Optional<User> byId = userRepository.findById(id);
        User user = byId.get()  ;
        return user;
    }

    private PlayerPriceDTO createInstancePlayerPrice(PlayerStats playerStats, double roundedStats){
        PlayerPriceDTO playerPriceDTO = new PlayerPriceDTO();
        playerPriceDTO.setId(playerStats.getId());
        playerPriceDTO.setBallsFaced(playerStats.getBallsFaced());
        playerPriceDTO.setInningsPlayed(playerStats.getInningsPlayed());
        playerPriceDTO.setWickets(playerStats.getWickets());
        playerPriceDTO.setTotalRuns(playerStats.getTotalRuns());
        playerPriceDTO.setUniversity(playerStats.getUniversity());
        playerPriceDTO.setName(playerStats.getName());
        playerPriceDTO.setOversBowled(playerStats.getOversBowled());
        playerPriceDTO.setCategory(playerStats.getCategory());
        double price =  (roundedStats*9)*1000;
        playerPriceDTO.setPrice(price);
        return playerPriceDTO;
    }

    private Double generateStats(PlayerStats playerStats){
        double strikeRate = ((double) playerStats.getTotalRuns() /playerStats.getBallsFaced())*100;
        double battingAverage = (double) playerStats.getTotalRuns() /playerStats.getInningsPlayed();
        double bowlingstrikeRate = (double) playerStats.getBallsFaced() /playerStats.getWickets();
        double economyRate = ((double) playerStats.getTotalRuns() /playerStats.getBallsFaced())*6;
        return (strikeRate/5 + battingAverage*0.8)+(500/bowlingstrikeRate + 140/economyRate);
    }


}
