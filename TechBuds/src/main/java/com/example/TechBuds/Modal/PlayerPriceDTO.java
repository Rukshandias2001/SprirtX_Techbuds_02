package com.example.TechBuds.Modal;
import lombok.*;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PlayerPriceDTO {
    private Double price;
    private String id;
    private String name;
    private String university;
    private String category;
    private int totalRuns;
    private int ballsFaced;
    private int inningsPlayed;
    private int wickets;
    private int oversBowled;
    private int runsConceded;

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public int getBallsFaced() {
        return ballsFaced;
    }

    public void setBallsFaced(int ballsFaced) {
        this.ballsFaced = ballsFaced;
    }

    public int getInningsPlayed() {
        return inningsPlayed;
    }

    public void setInningsPlayed(int inningsPlayed) {
        this.inningsPlayed = inningsPlayed;
    }

    public int getWickets() {
        return wickets;
    }

    public void setWickets(int wickets) {
        this.wickets = wickets;
    }

    public int getOversBowled() {
        return oversBowled;
    }

    public void setOversBowled(int oversBowled) {
        this.oversBowled = oversBowled;
    }

    public int getRunsConceded() {
        return runsConceded;
    }

    public void setRunsConceded(int runsConceded) {
        this.runsConceded = runsConceded;
    }


}
