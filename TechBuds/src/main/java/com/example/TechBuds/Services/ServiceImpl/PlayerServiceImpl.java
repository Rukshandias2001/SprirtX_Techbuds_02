package com.example.TechBuds.Services.ServiceImpl;

import com.example.TechBuds.Entities.PlayerStats;
import com.example.TechBuds.Modal.PlayerPriceDTO;
import com.example.TechBuds.Modal.PlayerStatDTO;
import com.example.TechBuds.Repositories.PlayerStatsRepository;
import com.example.TechBuds.Services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;


@Service
@Qualifier

public class PlayerServiceImpl implements PlayerService {

    @Autowired
    PlayerStatsRepository playerStatsRepository;

    @Override
    public ArrayList<PlayerStatDTO> getPlayerStats() {
        ArrayList<PlayerStats> all = (ArrayList<PlayerStats>) playerStatsRepository.findAll();

        ArrayList<PlayerStatDTO> listOfPlayerStatDTOS = new ArrayList<>();
        for (PlayerStats playerStats : all) {
            Double stats = generateStats(playerStats);

            // Round to 2 decimal places using BigDecimal
            BigDecimal roundedStats = new BigDecimal(stats).setScale(2, RoundingMode.HALF_UP);
            PlayerStatDTO playerStatDTO = createInstance(playerStats, roundedStats.doubleValue());
            listOfPlayerStatDTOS.add(playerStatDTO);

        }
        // Sort the list in DESCENDING order based on points
        listOfPlayerStatDTOS.sort(Comparator.comparingDouble(PlayerStatDTO::getPoints).reversed());

        return listOfPlayerStatDTOS;
    }

    public ArrayList<PlayerStats> getPlayer() {
        return (ArrayList<PlayerStats>) playerStatsRepository.findAll();

    }

    @Override
    public PlayerStats savePlayerStat(PlayerStats playerStat) {
        PlayerStats save = playerStatsRepository.save(playerStat);

        return save;
    }

    @Override
    public boolean deletePlayerStat(String id) {
        return playerStatsRepository.findById(id)
                .map(player -> {
                    playerStatsRepository.deleteById(id);
                    return true;
                })
                .orElse(false);
    }


    public ArrayList<PlayerPriceDTO> getPlayerPrice() {
        List<PlayerStats> all = playerStatsRepository.findAll();
        ArrayList<PlayerPriceDTO> listOfPlayerPriceDTOS = new ArrayList<>();
        for (PlayerStats playerStats : all) {
            double stats = generateStats(playerStats);
            PlayerPriceDTO instancePlayerPrice = createInstancePlayerPrice(playerStats, stats);
            listOfPlayerPriceDTOS.add(instancePlayerPrice);
        }

        return listOfPlayerPriceDTOS;
    }


    private PlayerStatDTO createInstance(PlayerStats playerStats,double roundedStats){
        PlayerStatDTO playerStatDTO = new PlayerStatDTO();
        playerStatDTO.setPoints(roundedStats); // Convert BigDecimal back to double
        playerStatDTO.setPlayerName(playerStats.getName());
        playerStatDTO.setCampus(playerStats.getUniversity());
        playerStatDTO.setId(playerStats.getId());
        DecimalFormat df = new DecimalFormat("0.00");  // Ensures two decimal places
        double price =  (roundedStats*9)*1000;

        return  playerStatDTO;

    }

    private PlayerPriceDTO createInstancePlayerPrice(PlayerStats playerStats,double roundedStats){
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

