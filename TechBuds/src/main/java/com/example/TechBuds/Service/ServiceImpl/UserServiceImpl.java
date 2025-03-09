package com.example.TechBuds.Service.ServiceImpl;

import com.example.TechBuds.Entities.Users;
import com.example.TechBuds.Repositories.UserRepository;
import com.example.TechBuds.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Qualifier
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    public Boolean addPlayer(String userId, String id,double playerPrice) {
        // Fetch user safely using orElseThrow to avoid NullPointerException
        Iterable<Users> all = userRepository.findAll();
        Users user = new Users();
        ArrayList<Users> userList = (ArrayList<Users>) StreamSupport.stream(all.spliterator(), false)
                .collect(Collectors.toList());
        for (Users data : userList) {
            if (data.getId().equals(id)) {
                user = data;
                break; // Exit loop early once the user is found
            }
        }
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
