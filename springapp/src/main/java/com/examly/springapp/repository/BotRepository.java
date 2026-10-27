package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Bot;
import com.examly.springapp.model.User;

@Repository
public interface BotRepository extends JpaRepository<Bot, Long> {

    List<Bot> findByOwner(User owner);

    List<Bot> findByStatus(String status);

    List<Bot> findByNameContainingIgnoreCase(String name);

}