package com.example.TechBuds.Controllers;

import com.example.TechBuds.Entities.PlayerStats;
import com.example.TechBuds.Entities.User;
import com.example.TechBuds.Services.UserServiceInclude;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/editUser")
@CrossOrigin
public class UserController {

    @Autowired
    UserServiceInclude userServiceInclude;

    @GetMapping("/addPlayer")
    public ResponseEntity<Boolean> savePlayer(@RequestParam("userId") String userId,@RequestParam("id") String id,@RequestParam("price") double playerPrice){
        Boolean condition = userServiceInclude.addPlayer(userId, id, playerPrice);
        return ResponseEntity.ok(condition);
    }

    @DeleteMapping("deletePlayer")
    public ResponseEntity<Boolean> deletePlayer(@RequestParam("userId") String userId,@RequestParam("id") String id,@RequestParam("price") double playerPrice){
        Boolean condition = userServiceInclude.deletePlayer(userId, id, playerPrice);
        return ResponseEntity.ok(condition);
    }

    @GetMapping("/getPlayers")
    public ResponseEntity<ArrayList<PlayerStats>> getPlayers(@RequestParam("listOfIds") List<String> ids){

        ArrayList<PlayerStats> playerStats = userServiceInclude.listOfPlayers((ArrayList<String>) ids);
        return  ResponseEntity.ok(playerStats);

    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getUser(@RequestParam("userId") String userId){
        User userById = userServiceInclude.getUserById(userId);
        return ResponseEntity.ok(userById);
    }






}
