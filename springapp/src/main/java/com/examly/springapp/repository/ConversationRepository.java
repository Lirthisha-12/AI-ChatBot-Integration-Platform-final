package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Bot;
import com.examly.springapp.model.Conversation;
import com.examly.springapp.model.User;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    List<Conversation> findByBot(Bot bot);

    List<Conversation> findByUser(User user);

    List<Conversation> findByStatus(String status);

}