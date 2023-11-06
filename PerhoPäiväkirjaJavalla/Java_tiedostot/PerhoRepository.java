
package com.soolo.rojekti;

import java.util.ArrayList;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PerhoRepository extends JpaRepository<Perho, Long>{

  
    @Override
    ArrayList<Perho> findAll();
    ArrayList<Perho> findByNimi(String nimi);
    Long deleteByNimi(String nimi);

   
}

