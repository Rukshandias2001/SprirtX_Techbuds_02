package com.example.TechBuds.Controllers;

import com.example.TechBuds.Entities.PlayerStats;
import com.example.TechBuds.Modal.PlayerPriceDTO;
import com.example.TechBuds.Modal.PlayerStatDTO;
import com.example.TechBuds.Service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController

@CrossOrigin
@RequestMapping("/players")
public class PlayerController {

    @Autowired
    PlayerService playerService;



    @GetMapping("/GetPlayers")
    public ResponseEntity<ArrayList<PlayerStats>> getPlayers() {
        ArrayList<PlayerStats> players = playerService.getPlayer();
        return  ResponseEntity.ok().body(players);
    }

    @GetMapping("/GetPlayerPrice")
    public ResponseEntity<ArrayList<PlayerPriceDTO>> getPlayerPrice() {
        ArrayList<PlayerPriceDTO> playerPrice = playerService.getPlayerPrice();
        return ResponseEntity.ok().body(playerPrice);
    }




}
