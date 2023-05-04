package com.manager.mountainview.application.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class Formatter {
    public static String localDateTimeToString(LocalDateTime time) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd/HH/mm");
        String result = time.format(formatter);

        return result;
    }
}
