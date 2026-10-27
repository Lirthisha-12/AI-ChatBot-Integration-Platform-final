package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.ChatBot;

public interface ChatBotRepository extends JpaRepository<ChatBot, Long> {

    List<ChatBot> findByPlatform(String platform);

}