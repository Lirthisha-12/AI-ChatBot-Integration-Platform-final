package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Bot;
import com.examly.springapp.model.Intent;

@Repository
public interface IntentRepository extends JpaRepository<Intent, Long> {

    List<Intent> findByBot(Bot bot);

    List<Intent> findByIsActive(Boolean isActive);

}