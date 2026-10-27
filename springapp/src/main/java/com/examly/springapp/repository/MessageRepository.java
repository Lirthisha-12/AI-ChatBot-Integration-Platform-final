package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Conversation;
import com.examly.springapp.model.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByConversation(Conversation conversation);

}