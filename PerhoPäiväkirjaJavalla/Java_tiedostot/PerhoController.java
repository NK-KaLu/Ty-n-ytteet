
package com.soolo.rojekti;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PerhoController {
    @Autowired
    private PerhoService perhoService;
    
    
    @GetMapping("/perhot")
    public String getPerhot(Model model) {
        ArrayList<Perho> perhot = perhoService.getPerhot();
        model.addAttribute("perhot", perhot);
        return "perhot";
    }
    
    @PostMapping("/perhot")
    public String addPerho(@RequestParam String perhoNimi, String perhoPaa, String perhoKurkku, String perhoVyo, String perhoPainotus,
            String perhoHela, String perhoSiipi, String perhoPyrsto, String perhoKierre, String perhoRunko, String perhoKoukku,
            String perhoHakila, String perhoSilmat, String perhoMuuta, int perhoKala){
            perhoService.addPerho(perhoNimi, perhoPaa, perhoKurkku, perhoVyo, perhoPainotus, perhoHela, perhoSiipi,
                        perhoPyrsto, perhoKierre, perhoRunko, perhoKoukku, perhoHakila, perhoSilmat, perhoMuuta, perhoKala);
            return "redirect:/perhot";
    }
    
    
    @GetMapping("perhot/{perhoNimi}")
    public String getPerhoInfo(@PathVariable String perhoNimi, Model model){
        Perho perho = perhoService.findPerhoByName(perhoNimi);
        model.addAttribute("perho", perho);
        return "perho"; 
    }
    
   
    
    @PostMapping("/poistaperho")
    public String deletePerho(@RequestParam String perhoNimi) {
        perhoService.deletePerhoByName(perhoNimi);
        return "redirect:/perhot";
    }
    
    @PostMapping("/lisaakala")
    public String lisaaKala(@RequestParam String perhoNimi) {
        perhoService.lisaaKala(perhoNimi);
        return "redirect:/perhot/" + perhoNimi;
    }
    
    
}
