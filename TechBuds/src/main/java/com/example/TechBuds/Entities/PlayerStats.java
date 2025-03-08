package com.example.TechBuds.Entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "player_stats")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PlayerStats {
    @Id
    private String id;

    @Field("Name")
    @JsonProperty("Name")
    private String name;

    @Field("University")
    @JsonProperty("University")
    private String university;

    @Field("Category")
    @JsonProperty("Category")
    private String category;

    @Field("Total Runs")
    @JsonProperty("Total Runs")  // Keep JSON mapping only for necessary fields
    private int totalRuns;

    @Field("Balls Faced")
    @JsonProperty("Balls Faced")
    private int ballsFaced;

    @Field("Innings Played")
    @JsonProperty("Innings Played")
    private int inningsPlayed;

    @Field("Wickets")
    @JsonProperty("Wickets")
    private int wickets;

    @Field("Overs Bowled")
    @JsonProperty("Overs Bowled")
    private int oversBowled;

    @Field("Runs Conceded")
    @JsonProperty("Runs Conceded")
    private int runsConceded;

    public int getOversBowled() {
        return oversBowled;
    }

    public void setOversBowled(int oversBowled) {
        this.oversBowled = oversBowled;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getTotalRuns() {
        return totalRuns;
    }

    public void setTotalRuns(int totalRuns) {
        this.totalRuns = totalRuns;
    }

    public int getInningsPlayed() {
        return inningsPlayed;
    }

    public void setInningsPlayed(int inningsPlayed) {
        this.inningsPlayed = inningsPlayed;
    }

    public int getBallsFaced() {
        return ballsFaced;
    }

    public void setBallsFaced(int ballsFaced) {
        this.ballsFaced = ballsFaced;
    }

    public int getWickets() {
        return wickets;
    }

    public void setWickets(int wickets) {
        this.wickets = wickets;
    }

    public int getRunsConceded() {
        return runsConceded;
    }

    public void setRunsConceded(int runsConceded) {
        this.runsConceded = runsConceded;
    }


}
