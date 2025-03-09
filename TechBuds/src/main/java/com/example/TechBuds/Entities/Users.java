package com.example.TechBuds.Entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.HashSet;
import java.util.Set;

@Document(collection =  "Users")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Users {
    @Id
    private String id;
    @Indexed(unique = true)
    private String username;
    private String password;
    private Boolean admin = false;
    private double price = 9000000;
    @Field("listOfPlayers")
    private Set<String> listOfPlayers = new HashSet<>();
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Set<String> getListOfPlayers() {
        return listOfPlayers;
    }

    public void setListOfPlayers(Set<String> listOfPlayers) {
        this.listOfPlayers = listOfPlayers;
    }


}
