package com.example.TechBuds.Controllers;

import com.example.TechBuds.Services.UserServiceInclude;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


}
