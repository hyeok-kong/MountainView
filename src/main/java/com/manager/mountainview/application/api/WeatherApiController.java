package com.manager.mountainview.application.api;

import com.manager.mountainview.application.service.WeatherService;
import lombok.RequiredArgsConstructor;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


import java.net.URL;
import java.util.HashMap;

@RequiredArgsConstructor
@RestController
public class WeatherApiController {
    private final WeatherService weatherService;

    @GetMapping("/api/weather/{code}")
    public JSONObject getMountainWeather(@PathVariable String code) {
        return weatherService.getMountainWeather(code);
    }

    @GetMapping("/api/weather/{code}/test")
    public String weather(@PathVariable String code) {
        return weatherService.getWeatherUrl(code);
    }
}
