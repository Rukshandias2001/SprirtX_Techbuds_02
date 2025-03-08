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
            PlayerStatDTO playerStatDTO = new PlayerStatDTO();

            double strikeRate = ((double) playerStats.getTotalRuns() /playerStats.getBallsFaced())*100;
            double battingAverage = (double) playerStats.getTotalRuns() /playerStats.getInningsPlayed();
            double bowlingstrikeRate = (double) playerStats.getBallsFaced() /playerStats.getWickets();
            double economyRate = ((double) playerStats.getTotalRuns() /playerStats.getBallsFaced())*6;
            double stats = (strikeRate/5 + battingAverage*0.8)+(500/bowlingstrikeRate + 140/economyRate);
            // Round to 2 decimal places using BigDecimal
            BigDecimal roundedStats = new BigDecimal(stats).setScale(2, RoundingMode.HALF_UP);

            playerStatDTO.setPoints(roundedStats.doubleValue()); // Convert BigDecimal back to double
            playerStatDTO.setPlayerName(playerStats.getName());
            playerStatDTO.setCampus(playerStats.getUniversity());
            playerStatDTO.setId(playerStats.getId());
            listOfPlayerStatDTOS.add(playerStatDTO);

        }
        // Sort the list in DESCENDING order based on points
        listOfPlayerStatDTOS.sort(Comparator.comparingDouble(PlayerStatDTO::getPoints).reversed());

        return listOfPlayerStatDTOS;

    }
}