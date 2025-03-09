package com.example.TechBuds.Controllers;

import com.example.TechBuds.Service.PlayerService;
import com.example.TechBuds.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@CrossOrigin
@RequestMapping("/User")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/addPlayer")
    public ResponseEntity<Boolean> addPlayers(@RequestParam("userId") String userId,@RequestParam("id") String id,@RequestParam("price") double playerPrice){
        Boolean condition = userService.addPlayer(userId, id, playerPrice);
        return  ResponseEntity.ok(condition);

    }

}
