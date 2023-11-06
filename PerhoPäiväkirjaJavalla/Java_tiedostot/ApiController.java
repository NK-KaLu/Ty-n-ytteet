/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.soolo.rojekti;

/**
 *
 * @author Nikok
 */
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ApiController {
    
     @GetMapping("/")
    public String getIndex() {
        return "index";
    }
    
    @GetMapping("*")
    public String getDefault() {
        return "redirect:/";
    }
}
