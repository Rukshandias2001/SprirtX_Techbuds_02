package com.example.TechBuds.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.annotation.processing.Generated;

@Document(collection =  "Users")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Users {
    @Id
    private Integer id;
    private String name;
    private String email;
}
