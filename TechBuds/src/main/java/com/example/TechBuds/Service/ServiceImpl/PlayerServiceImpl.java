package com.example.TechBuds.Service.ServiceImpl;

import com.example.TechBuds.Entities.PlayerStats;
import com.example.TechBuds.Modal.PlayerStatDTO;
import com.example.TechBuds.Repositories.PlayerStatsRepository;
import com.example.TechBuds.Service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;


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


            double strikeRate = ((double) playerStats.getTotalRuns() /playerStats.getBallsFaced())*100;
            double battingAverage = (double) playerStats.getTotalRuns() /playerStats.getInningsPlayed();
            double bowlingstrikeRate = (double) playerStats.getBallsFaced() /playerStats.getWickets();
            double economyRate = ((double) playerStats.getTotalRuns() /playerStats.getBallsFaced())*6;
            double stats = (strikeRate/5 + battingAverage*0.8)+(500/bowlingstrikeRate + 140/economyRate);

            // Round to 2 decimal places using BigDecimal
            BigDecimal roundedStats = new BigDecimal(stats).setScale(2, RoundingMode.HALF_UP);
            PlayerStatDTO playerStatDTO = createInstance(playerStats, roundedStats);
            listOfPlayerStatDTOS.add(playerStatDTO);

        }
        // Sort the list in DESCENDING order based on points
        listOfPlayerStatDTOS.sort(Comparator.comparingDouble(PlayerStatDTO::getPoints).reversed());

        return listOfPlayerStatDTOS;
    }

    public ArrayList<PlayerStats> getPlayer() {
        return (ArrayList<PlayerStats>) playerStatsRepository.findAll();

    }



    private PlayerStatDTO createInstance(PlayerStats playerStats,BigDecimal roundedStats){
        PlayerStatDTO playerStatDTO = new PlayerStatDTO();
        playerStatDTO.setPoints(roundedStats.doubleValue()); // Convert BigDecimal back to double
        playerStatDTO.setPlayerName(playerStats.getName());
        playerStatDTO.setCampus(playerStats.getUniversity());
        playerStatDTO.setId(playerStats.getId());
        DecimalFormat df = new DecimalFormat("0.00");  // Ensures two decimal places
        double price =  (roundedStats.doubleValue()*9)*1000;
        BigDecimal roundPrice = new BigDecimal(price).setScale(2, RoundingMode.HALF_UP);
        playerStatDTO.setPrice(roundPrice.doubleValue());
        String format = df.format(Double.parseDouble(df.format(roundPrice.doubleValue())));

        return  playerStatDTO;


    }
}
