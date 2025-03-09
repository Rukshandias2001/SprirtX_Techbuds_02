package com.example.TechBuds.Controllers;


import com.example.TechBuds.Entities.PlayerStats;
import com.example.TechBuds.Modal.PlayerPriceDTO;
import com.example.TechBuds.Modal.PlayerStatDTO;
import com.example.TechBuds.Services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;


@RestController

@RequestMapping("/Admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    PlayerService playerService;

    @GetMapping("/LeaderBoard")
    public ResponseEntity<ArrayList<PlayerStatDTO>> getAllPlayers() {
        ArrayList<PlayerStatDTO> playerStats = playerService.getPlayerStats();
        return  ResponseEntity.ok().body(playerStats);

    }

    @PostMapping("/addPlayer")
    public ResponseEntity<PlayerStats> getPlayerStat(PlayerStats playerStat) {
        PlayerStats playerStats = playerService.savePlayerStat(playerStat);
        return ResponseEntity.ok().body(playerStats);
    }

    @DeleteMapping("/deletePlayer")
    public ResponseEntity<Boolean> deletePlayerStat(@RequestParam("id") String id) {
        boolean condition = playerService.deletePlayerStat(id);
        return ResponseEntity.ok().body(condition);
    }
}
