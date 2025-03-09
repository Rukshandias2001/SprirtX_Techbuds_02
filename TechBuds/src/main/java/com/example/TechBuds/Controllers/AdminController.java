package com.example.TechBuds.Controllers;


import com.example.TechBuds.Modal.PlayerStatDTO;
import com.example.TechBuds.Services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;


@RestController

@RequestMapping("/Admin")
@CrossOrigin(origins = "http://localhost:5174")
public class AdminController {

    @Autowired
    PlayerService playerService;

    @GetMapping("/LeaderBoard")
    public ResponseEntity<ArrayList<PlayerStatDTO>> getAllPlayers() {
        ArrayList<PlayerStatDTO> playerStats = playerService.getPlayerStats();
        return  ResponseEntity.ok().body(playerStats);

    }
}
