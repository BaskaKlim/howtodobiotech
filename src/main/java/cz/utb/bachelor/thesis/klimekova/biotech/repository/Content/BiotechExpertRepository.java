package cz.utb.bachelor.thesis.klimekova.biotech.repository.Content;

import cz.utb.bachelor.thesis.klimekova.biotech.model.Content.BiotechExpert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BiotechExpertRepository extends JpaRepository<BiotechExpert, UUID> {

}