
package com.soolo.rojekti;
 
import javax.persistence.Entity;
import org.springframework.data.jpa.domain.AbstractPersistable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Perho extends AbstractPersistable<Long> {
    private String nimi;
    private String paa;
    private String kurkku;
    private String vyo;
    private String painotus;
    private String hela;
    private String siipi;
    private String pyrsto;
    private String kierre;
    private String runko;
    private String koukku;
    private String hakila;
    private String silmat;
    private String muuta;
    private int kala;


    public void saatuKala(){

            this.kala += 1;
    }
}