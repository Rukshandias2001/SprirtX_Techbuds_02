package com.example.TechBuds.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "player_stats")
public class PlayerStats {
    @Id
    private String id;

    @Field("Name")
    private String name;

    @Field("University")
    private String university;

    @Field("Category")
    private String category;

    @Field("Total Runs")
    private int totalRuns;

    @Field("Balls Faced")
    private int ballsFaced;

    @Field("Innings Played")
    private int inningsPlayed;

    @Field("Wickets")
    private int wickets;

    @Field("Overs Bowled")
    private int oversBowled;

    @Field("Runs Conceded")
    private int runsConceded;
}
