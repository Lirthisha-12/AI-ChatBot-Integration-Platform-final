package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.dto.request.ConversationRequest;
import com.examly.springapp.dto.response.ConversationResponse;

public interface ConversationService {

    ConversationResponse createConversation(ConversationRequest request);

    List<ConversationResponse> getAllConversations();

    ConversationResponse getConversationById(Long id);

    ConversationResponse updateConversation(Long id,ConversationRequest request);

    void deleteConversation(Long id);

}