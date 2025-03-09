package com.example.TechBuds.Controllers;

import com.example.TechBuds.Entities.PlayerStats;
import com.example.TechBuds.Modal.PlayerPriceDTO;
import com.example.TechBuds.Services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;

@RestController


@RequestMapping("/players")
@CrossOrigin(origins = "http://localhost:5173")
public class PlayerController {
    @Autowired
    PlayerService playerService;

    @GetMapping("/getPlayersByPrice")
    public  ResponseEntity<ArrayList<PlayerPriceDTO>> getPlayerInDetail(){
        ArrayList<PlayerPriceDTO> playerPrice = playerService.getPlayerPrice();
        return ResponseEntity.ok().body(playerPrice);

    }

    @GetMapping("/GetPlayers")
    public ResponseEntity<ArrayList<PlayerStats>> getPlayers() {
        ArrayList<PlayerStats> players = playerService.getPlayer();
        return  ResponseEntity.ok().body(players);
    }




}
