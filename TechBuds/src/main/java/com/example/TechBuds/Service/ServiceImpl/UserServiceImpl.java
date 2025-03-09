package com.example.TechBuds.Service.ServiceImpl;

import com.example.TechBuds.Entities.Users;
import com.example.TechBuds.Repositories.UserRepository;
import com.example.TechBuds.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@Qualifier
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    public Boolean addPlayer(String userId, String id,double playerPrice) {
        // Fetch user safely using orElseThrow to avoid NullPointerException
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        Iterable<Users> all = userRepository.findAll();

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
    }

}
