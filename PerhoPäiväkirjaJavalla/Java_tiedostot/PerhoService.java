
package com.soolo.rojekti;

import java.util.ArrayList;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PerhoService {
    @Autowired
    private PerhoRepository perhoRepository;
    
    public ArrayList<Perho> getPerhot() {
        return this.perhoRepository.findAll();
        
    }
    
    
    public void addPerho (String nimi, String paa, String kurkku, String vyo, String painotus,
            String hela, String siipi, String pyrsto, String kierre, String runko, String koukku, String hakila, String silmat, String muuta, int kala){
        this.perhoRepository.save(new Perho(nimi, paa, kurkku, vyo, painotus, hela, siipi, pyrsto, kierre, runko, koukku, hakila, silmat, muuta, kala));
    }
    
    public Perho findPerhoByName(String perhoNimi) {
        return this.perhoRepository.findByNimi(perhoNimi).get(0);
    }
       
    
    @Transactional
    public void deletePerhoByName(String nimi) {
        this.perhoRepository.deleteByNimi(nimi);
    }
    
    public void lisaaKala(String perhoNimi){
        Perho perho = this.findPerhoByName(perhoNimi);
            perho.saatuKala();
            this.perhoRepository.save(perho);
    }
}
