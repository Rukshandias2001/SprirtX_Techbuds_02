package com.example.TechBuds.Services.ServiceImpl;

import com.example.TechBuds.Entities.User;
import com.example.TechBuds.Repositories.UserRepository;
import com.example.TechBuds.Services.UserService;
import com.example.TechBuds.Services.UserServiceInclude;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Qualifier
public class UserServiceImpl implements UserServiceInclude {

    @Autowired
    UserRepository userRepository;

    public Boolean addPlayer(String userId, String id,double playerPrice) {
        // Fetch user safely using orElseThrow to avoid NullPointerException
        Iterable<User> all = userRepository.findAll();
        Optional<User> byId = userRepository.findById(userId);
        if(byId.isPresent()) {
            User user = byId.get();
            // Ensure listOfPlayers is modifiable
            Set<String> listOfPlayers = user.getListOfPlayers();
            if (listOfPlayers == null) {
                listOfPlayers = new HashSet<>();  // Initialize if null
                user.setListOfPlayers(listOfPlayers);
            }


            // Check if player already exists
            if (listOfPlayers.contains(id)) {
                return false; // Player already exists, return false
            }
            if(listOfPlayers.size()>11){
                return false;
            }
            double price = user.getPrice();
            double remain  = price - playerPrice;
            if(remain<0){
                return false;
            }
            // Add new player and save
            user.setPrice(remain);
            listOfPlayers.add(id);
            userRepository.save(user);
            return true;
        }else{
            return false;
        }

    }

}
