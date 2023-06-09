package cz.utb.fai.howtodobiotech.models.content;

import cz.utb.fai.howtodobiotech.models.categories.Country;
import cz.utb.fai.howtodobiotech.models.categories.ExpertCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "BiotechExperts")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BiotechExpert {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank(message = "First is mandatory")
    @Size(min = 2, max = 30)
    private String firstName;
    @NotBlank(message = "Last name is mandatory")
    @Size(min = 2, max = 30)
    private String lastName;

    @NotBlank(message = "Job position is mandatory")
    @Size(max = 400)
    private String jobPosition;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email is need to be in correct format")
    private String email;

    @Size(max = 400)
    private String linkedinUrl;

    private String profileImageUrl;

    @NotBlank(message = "Description of organization is mandatory")
    @Size(max = 2000)
    private String backgroundDescription;

    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name = "BiotechExpert_Countries",
            joinColumns = @JoinColumn(name = "BiotechExpert_id"),
            inverseJoinColumns = @JoinColumn(name = "Country_Id"))
    private Set<Country> countries;

    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name = "BiotechExpert_ExpertCategories",
            joinColumns = @JoinColumn(name = "BiotechExpert_id"),
            inverseJoinColumns = @JoinColumn(name = "ExpertCategory_id"))
    private Set<ExpertCategory> expertises = new HashSet<>();

    public BiotechExpert(String firstName, String lastName, String jobPosition, String email, String linkedinUrl, String profileImageUrl, String backgroundDescription, Set<Country> countries, Set<ExpertCategory> expertises) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobPosition = jobPosition;
        this.email = email;
        this.linkedinUrl = linkedinUrl;
        this.profileImageUrl = profileImageUrl;
        this.backgroundDescription = backgroundDescription;
        this.countries = countries;
        this.expertises = expertises;
    }
}
