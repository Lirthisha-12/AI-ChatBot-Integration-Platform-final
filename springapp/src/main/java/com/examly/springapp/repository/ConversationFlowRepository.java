package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Bot;
import com.examly.springapp.model.ConversationFlow;

@Repository
public interface ConversationFlowRepository extends JpaRepository<ConversationFlow, Long> {

    List<ConversationFlow> findByBot(Bot bot);

    List<ConversationFlow> findByIsActive(Boolean isActive);

}